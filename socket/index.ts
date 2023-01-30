import { Types } from "mongoose";
import { io } from ".."
import { Connection } from "../models/connection.model";
import { Room } from "../models/room.model";
import { RoomDataPayload, RoomExitedPayload, RoomExitPayload, RoomJoinedPayload, RoomJoinPayload, VideoPlayRequestPayload, VideoPlayResponsePayload, VideoSeekRequestPayload, VideoSeekResponsePayload } from "../types";
import { exitRoom, getRoomClients } from "./socket-helpers";

export const socketManager = async () => {
    io.on('connection', socket => {
        socket.broadcast.emit('user-connected', `Dołączył użytkownik o id: ${socket.id}`);
        socket.on('disconnect', async () => {
            const clients = await getRoomClients(socket.id);
            exitRoom(socket.id);
            if (!clients) return;
            const index = clients.findIndex(c => c.socketId === socket.id)
            const client = index !== -1 ? clients[index] : null;

            const newClients = clients.filter(c => c.socketId !== socket.id);

            io.to(newClients.map(c => c.socketId)).emit('room-exited', { username: client?.username || 'Someone', clients: newClients } as RoomExitedPayload);
        })

        // Room
        socket.on('room-join', async ({ roomId, socketId, username, avatar }: RoomJoinPayload) => {
            const room = await Room.findOne({ _id: roomId });
            if (!room) return; // jakaś zwrotka że pokój już nie istnieje i przekierowanie na stronę główną
            const { clients, src } = room;
            await Connection.create({ room: new Types.ObjectId(roomId), socketId });
            await Room.findOneAndUpdate(
                { _id: roomId },
                { $push: { clients: { host: clients.length === 0, socketId, username, avatar: avatar || null } } },
            );
            console.log(`Klient o id ${socketId} dołączył do pokoju.`);
            const { clients: newClients } = await Room.findOne({ _id: roomId });

            io.to(socket.id).emit('room-data', { src } as RoomDataPayload);
            io.to(newClients.map(c => c.socketId)).emit('room-joined', { username, clients: newClients } as RoomJoinedPayload);
        })

        socket.on('room-exit', async ({ username }: RoomExitPayload) => {
            exitRoom(socket.id);
            const clients = await getRoomClients(socket.id);
            if (!clients) return;
            io.to(clients.map(c => c.socketId)).emit('room-exited', { username, clients } as RoomExitedPayload);
        })

        // Video
        socket.on('video-play-request', async ({ date, played }: VideoPlayRequestPayload) => {
            io.to((await getRoomClients(socket.id)).map(c => c.socketId)).emit('video-play-response', { date, played } as VideoPlayResponsePayload);
        })
        socket.on('video-pause-request', async () => {
            io.to((await getRoomClients(socket.id)).map(c => c.socketId)).emit('video-pause-response');
        })
        socket.on('video-seek-request', async ({ date, played }: VideoSeekRequestPayload) => {
            io.to((await getRoomClients(socket.id)).map(c => c.socketId)).emit('video-seek-response', { date, played } as VideoSeekResponsePayload);
        })

        // Chat
    })
};