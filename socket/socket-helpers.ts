import { Connection } from "../models/connection.model";
import { Room } from "../models/room.model";

export const exitRoom = async (socketId: string) => {
    const connection = await Connection.findOne({ socketId });
    if (!connection) return;
    await Room.findOneAndUpdate({ _id: connection.room }, { $pull: { clients: { socketId } } });
    console.log(`Klient o id ${socketId} został usunięty z pokoju.`);
    await Connection.deleteOne({ socketId });
};