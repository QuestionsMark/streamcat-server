import { Router } from "express";
import { io } from "..";
import { Room } from "../models/room.model";
import { RoomVideoNewPayload } from "../types";
import { removeRoomJob } from "../utils/cron.util";
import { sendErrorResponse, sendSuccessfullResponse } from "../utils/response.util";

export const roomRouter = Router()
    // Create room
    .post('/', async (req, res) => {
        const { _id } = await Room.create({});
        removeRoomJob();
        res.status(201).send(sendSuccessfullResponse(_id.toString()));
    })

    // Pobieranie pojedynczego pokoju
    .get('/:roomId', async (req, res) => {
        const { roomId } = req.params;
        const room = await Room.findOne({ roomId });
        if (!room) return res.status(404).send(sendErrorResponse('Room expired.'));
        res.status(200).send(sendSuccessfullResponse('Successfully joined to the room.'));
    })

    // Pobieranie danych o video
    .post('/:_id/find-video', async (req, res) => {
        const { _id } = req.params;
        const { link } = req.body;
        const src = link;
        const room = await Room.findOne({ _id });
        if (!room) return; // Zwrotka że pokoju już nie ma i przekierowanie na stronę główną
        const { clients } = room;
        await Room.findOneAndUpdate({ _id }, { $set: { src } });
        io.to(clients.map(c => c.socketId)).emit('room-video-new', { src } as RoomVideoNewPayload);
        res.status(200).send(sendSuccessfullResponse('Video changed.'));
    })