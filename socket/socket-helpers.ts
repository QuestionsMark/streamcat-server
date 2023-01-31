import { Connection } from "../models/connection.model";
import { Room } from "../models/room.model";
import { RoomClient } from "../types";

export const exitRoom = async (socketId: string) => {
    const connection = await Connection.findOne({ socketId });
    if (!connection) return;
    await Room.findOneAndUpdate({ _id: connection.room }, { $pull: { clients: { socketId } } });
    await Connection.deleteOne({ socketId });
};

export const getRoomClients = async (socketId: string): Promise<RoomClient[] | null> => {
    const connection = await Connection.findOne({ socketId });
    if (!connection) return null;
    const room = await Room.findOne({ _id: connection.room });
    if (!room) return null;
    return room.clients as RoomClient[];
};