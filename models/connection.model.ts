import { model, Schema, SchemaTypes } from "mongoose";

export const Connection = model('connection', new Schema({
    socketId: {
        type: String,
        required: true,
        immutable: true,
    },
    room: {
        type: SchemaTypes.ObjectId,
        ref: 'room',
        required: true,
    },
}))