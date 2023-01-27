import { model, Schema } from "mongoose";

export const Room = model('room', new Schema({
    clients: [{
        socketId: String,
        username: String,
        host: Boolean,
    }],
    createdAt: {
        type: Date,
        default: () => new Date(),
        immutable: true,
    },
    expiredAt: {
        type: Date,
        default: () => new Date().getTime() + 1000 * 60 * 60,
    }
}));