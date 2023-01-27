export interface RoomJoinPayload {
    roomId: string;
    socketId: string;
    username: string;
}

export interface RoomExitPayload {
    roomId: string;
    username: string;
}