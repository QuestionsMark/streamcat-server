import { Connection } from "../models/connection.model";
import { Room } from "../models/room.model";
import { RoomClient } from "../types";

export const exitRoom = async (socketId: string) => {
    const connection = await Connection.findOne({ socketId });
    if (!connection) return;
    await Room.findOneAndUpdate({ _id: connection.room }, { $pull: { clients: { socketId } } });
    console.log(`Klient o id ${socketId} został usunięty z pokoju.`);
    await Connection.deleteOne({ socketId });
};

export const getRoomClients = async (socketId: string): Promise<RoomClient[]> => {
    const connection = await Connection.findOne({ socketId });
    if (!connection) return;
    const room = await Room.findOne({ _id: connection.room });
    if (!room) return;
    return room.clients as RoomClient[];
};