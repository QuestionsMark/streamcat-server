import { NextFunction, Request, Response } from "express";
import { sendErrorResponse } from "../utils/response.util";

export class ValidationError extends Error {
    problems?: string[];

    constructor(message: string, problems?: string[]) {
        super(message);
        this.problems = problems;
    }
}

export const errorHandling = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    if (err instanceof ValidationError) {
        return res.status(400).json(sendErrorResponse(err.message, err.problems));
    }
    res.status(500).json(sendErrorResponse('Something went wrong! Try again later.'));
};