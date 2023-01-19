import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";
import cors from "cors";

import { CORS_ORIGIN } from "./config/config";
import { errorHandling } from "./middlewares/errors.middleware";
import { homeRouter } from "./routers";

// Important imports
import "express-async-errors";
import { socketManager } from "./socket";

// App config
const port = process.env.PORT || 3001;
const app = express();

const server = createServer(app);
export const io = new Server(server, {
    cors: {
        origin: CORS_ORIGIN,
    },
});

// Middlewares
app.use(express.json());
app.use(express.static('./public'));
app.use(cors({
    origin: CORS_ORIGIN,
}))

// Routers
app.use('/', homeRouter);

// Error handling
app.use(errorHandling);

// Socket menager
socketManager();

// Listener
server.listen(port, () => console.log(`Server is listening on http://localhost:${port}`));