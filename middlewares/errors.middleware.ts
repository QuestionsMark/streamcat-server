import { NextFunction, Request, Response } from "express";

export class ValidationError extends Error {};

export const errorHandling = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ValidationError) {
        return res.status(400).json({ error: err.name, message: err.message });
    }
    res.status(500).json({ error: 'FatalError', message: 'Przepraszamy, spróbuj ponownie później.' });
};