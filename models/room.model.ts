import { model, Schema } from "mongoose";

export const Room = model('room', new Schema({
    clients: [{
        host: Boolean,
        username: String,
        socketId: String,
        avatar: {
            type: String,
            nullable: true,
        },
    }],
    src: {
        type: String,
        default: '',
    },
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