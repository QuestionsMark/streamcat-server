import { ServerErrorResponse, ServerSuccessfullResponse } from "../types";

export const sendSuccessfullResponse = <T>(results: T, count?: number): ServerSuccessfullResponse<T> => {
    if (count) return { results, count };
    return { results };
};

export const sendErrorResponse = (message: string, problems?: string[]): ServerErrorResponse => {
    if (problems && problems.length !== 0) return { message, problems };
    return { message };
};