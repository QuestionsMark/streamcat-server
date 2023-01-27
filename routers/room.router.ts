import { Router } from "express";
import { Room } from "../models/room.model";
import { sendSuccessfullResponse } from "../utils/response.util";

export const roomRouter = Router()
    .post('/', async (req, res) => {
        const { _id } = await Room.create({});
        res.send(sendSuccessfullResponse(_id.toString()));
    })