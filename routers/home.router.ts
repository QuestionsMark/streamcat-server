import { Router } from "express";
import { sendSuccessfullResponse } from "../utils/response.util";

export const homeRouter = Router()
    .get('/', (req, res) => {
        res.status(200).send(sendSuccessfullResponse('Hello Clever Programmers from streamcat.com!'));
    })