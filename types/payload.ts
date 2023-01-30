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
    clients: RoomClient[];
}

export interface RoomExitPayload {
    username: string;
}
export interface RoomExitedPayload {
    username: string;
    clients: RoomClient[];
}

export interface RoomVideoNewPayload {
    src: string;
}

export interface RoomDataPayload {
    src: string;
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
