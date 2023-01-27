export interface ServerSuccessfullResponse<T> {
    results: T;
    count?: number;
}

export interface ServerErrorResponse {
    message: string;
    problems?: string[];
}

export type ServerResponse<T> = ServerSuccessfullResponse<T> | ServerErrorResponse;