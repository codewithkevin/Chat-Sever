import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import logger from "./utils/logger";
import routes from "./routes";
import { socketHandler } from "./utils/socket";
import { connectDB } from "./utils/connectDB";

const port = process.env.PORT;

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

server.listen(port, async () => {
    logger.info(`Server is running on port http://localhost:${port}`);
    await connectDB();
    socketHandler(io);
    routes(app);
});

export default app;