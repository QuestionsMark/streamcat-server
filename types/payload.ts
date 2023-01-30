export interface RoomClient {
    host: boolean;
    username: string;
    socketId: string;
    avatar?: string;
}

//Room Payloads
export interface RoomJoinPayload {
    roomId: string;
    socketId: string;
    username: string;
    avatar?: string;
}
export interface RoomJoinedPayload {
    username: string;
}

export interface RoomExitPayload {
    roomId: string;
    username: string;
}
export interface RoomExitedPayload {
    username: string;
}

export interface RoomVideoNewPayload {
    src: string;
}

export interface RoomDataPayload {
    src: string;
    clients: RoomClient[];
}

export interface RoomSynchronizedPayload {
    time: number;
}

// Video Payloads
export interface VideoPlayRequestPayload {
    date: number;
    played: number;
}

export interface VideoPlayResponsePayload {
    date: number;
    played: number;
}

export interface VideoSeekRequestPayload {
    date: number;
    played: number;
}

export interface VideoSeekResponsePayload {
    date: number;
    played: number;
}
