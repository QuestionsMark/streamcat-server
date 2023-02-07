import { model, Schema } from "mongoose";

export const Cron = model('cron', new Schema({
    name: String,
    createdAt: {
        type: Date,
        default: new Date(),
        immutable: true,
    },
}));