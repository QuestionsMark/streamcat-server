import { Router } from "express";

export const homeRouter = Router()
    .get('/', (req, res) => {
        res.status(200).send('Hello Clever Programmers from streamcat.com!');
    })