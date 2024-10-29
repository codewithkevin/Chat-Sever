import { Server, Socket } from "socket.io";
import chatEventSocket from "../socket/chatEventSocket";

export const socketHandler = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        console.log("User connected:", socket.id);

        chatEventSocket(io, socket);

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
};