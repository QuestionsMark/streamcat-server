import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";
import cors from "cors";

import { CORS_ORIGIN, DB_CONNECTION } from "./config/config";
import { errorHandling } from "./middlewares/errors.middleware";
import { homeRouter, roomRouter, userRouter } from "./routers";

// Important imports
import "express-async-errors";
import { socketManager } from "./socket";
import { connect } from "mongoose";

// App config
const port = process.env.PORT || 3001;
const app = express();

const server = createServer(app);
export const io = new Server(server, {
    cors: {
        origin: CORS_ORIGIN,
        credentials: true,
    },
});

// Middlewares
app.use(express.json());
app.use(express.static('./public'));
app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true,
}))

// Routers
app.use('/', homeRouter);
app.use('/room', roomRouter);
app.use('/user', userRouter);

// Error handling
app.use(errorHandling);

// DB config

connect(DB_CONNECTION, async () => {
    console.log('Connected to database.');
    
    // Listener
    server.listen(port, () => console.log(`Server is listening on http://localhost:${port}`));
});

// Socket menager
socketManager();
