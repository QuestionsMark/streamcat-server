import { CronJob } from "cron";
import { Cron } from "../models/cron.model";
import { Room } from "../models/room.model";

export const removeRoomJob = async () => {
    const job = await Cron.findOne({ name: 'removeRoomJob' });
    if (job) return;
    new CronJob(
        '*/1 * * * *',
        async function () {
            const rooms = await Room.find();
            for (const { clients, _id } of rooms) {
                if (clients.length === 0) {
                    await Room.deleteOne({ _id });
                }
            }
            const newRooms = await Room.find();
            if (newRooms.length === 0) {
                await Cron.deleteOne({ name: 'removeRoomJob' });
                this.stop();
            };
        },
        () => console.log('removeRoomJob done.'),
        true,
    );
    await Cron.create({ name: 'removeRoomJob' });
};