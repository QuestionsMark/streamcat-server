import { Types } from "mongoose";
import { io } from ".."
import { Connection } from "../models/connection.model";
import { Room } from "../models/room.model";
import { RoomExitPayload, RoomJoinPayload } from "../types/payload";
import { exitRoom } from "./socket-helpers";

export const socketManager = async () => {
    io.on('connection', socket => {
        socket.broadcast.emit('user-connected', `Dołączył użytkownik o id: ${socket.id}`);
        socket.on('disconnect', async () => {
            // socket.broadcast.emit('user-disconnected', `Użytkownik o id: ${socket.id} poszedł w pizdu :(`);
            exitRoom(socket.id);
        })

        // Room
        socket.on('room-join', async ({ roomId, socketId, username }: RoomJoinPayload) => {
            const { clients } = await Room.findOne({ _id: roomId });
            await Connection.create({ room: new Types.ObjectId(roomId), socketId });
            await Room.findOneAndUpdate(
                { _id: roomId },
                { $push: { clients: { host: clients.length === 0, socketId, username } } },
            );
            console.log(`Klient p id ${socketId} dołączył do pokoju.`);

            io.to(clients.map(c => c.socketId)).emit('room-joined', { username });
        })

        socket.on('room-exit', async ({ roomId, username }: RoomExitPayload) => {
            exitRoom(socket.id);
            const { clients } = await Room.findOne({ _id: roomId });
            io.to(clients.map(c => c.socketId)).emit('room-exited', { username });
        })
    })
};