import { Types } from "mongoose";
import { io } from ".."
import { Connection } from "../models/connection.model";
import { Room } from "../models/room.model";
import { RoomDataPayload, RoomExitedPayload, RoomExitPayload, RoomJoinedPayload, RoomJoinPayload, VideoPlayRequestPayload, VideoPlayResponsePayload } from "../types";
import { exitRoom, getRoomClients } from "./socket-helpers";

export const socketManager = async () => {
    io.on('connection', socket => {
        socket.broadcast.emit('user-connected', `Dołączył użytkownik o id: ${socket.id}`);
        socket.on('disconnect', async () => {
            exitRoom(socket.id);
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

            io.to(socket.id).emit('room-data', { clients, src } as RoomDataPayload);
            io.to(clients.map(c => c.socketId)).emit('room-joined', { username } as RoomJoinedPayload);
        })

        socket.on('room-exit', async ({ roomId, username }: RoomExitPayload) => {
            exitRoom(socket.id);
            const room = await Room.findOne({ _id: roomId });
            if (!room) return;
            io.to(room.clients.map(c => c.socketId)).emit('room-exited', { username } as RoomExitedPayload);
        })

        // Video
        socket.on('video-play-request', async ({ date, played }: VideoPlayRequestPayload) => {
            io.to((await getRoomClients(socket.id)).map(c => c.socketId)).emit('video-play-response', { date, played } as VideoPlayResponsePayload);
        })
        socket.on('video-pause-request', async () => {
            io.to((await getRoomClients(socket.id)).map(c => c.socketId)).emit('video-pause-response');
        })
    })
};