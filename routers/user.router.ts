import { Router } from "express";
import { io } from "..";
// import { ValidationError } from "../middlewares/errors.middleware";
import { Connection } from "../models/connection.model";
import { Room } from "../models/room.model";
import { ClientSettingsChangePayload } from "../types";
import { sendSuccessfullResponse } from "../utils/response.util";
// import { AccountSettingsSchema, checkValidation } from "../utils/validation.util";

export const userRouter = Router()
    .put('/:socketId/settings', async (req, res) => {
        const { socketId } = req.params;
        const { avatar, username } = req.body as { avatar: string, username: string };
        // const errors = checkValidation(req.body, AccountSettingsSchema);
        // if (errors) throw new ValidationError('Incorrect data!');
        const connection = await Connection.findOne({ socketId });
        if (connection) {
            const { room: roomId } = connection;
            const room = await Room.findOne({ _id: roomId });
            if (room) {
                const host = room.clients.find(c => c.socketId === socketId).host;
                await Room.findOneAndUpdate({ _id: roomId }, { $pull: { clients: { socketId } } });
                await Room.findOneAndUpdate({ _id: roomId }, { $push: { clients: { avatar, host, socketId, username } } });
                const newRoom = await Room.findOne({ _id: roomId });
                io.to(newRoom.clients.map(c => c.socketId)).emit('client-settings-change', { clients: newRoom.clients.map(({ avatar, host, socketId, username }) => ({ avatar, host, socketId, username })) } as ClientSettingsChangePayload);
            }
        }
        res.status(200).send(sendSuccessfullResponse('Account settings successfully changed!'));
    })