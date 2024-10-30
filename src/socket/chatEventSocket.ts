import { Server, Socket } from "socket.io";
import * as chatService from "../chat/services/chatServices";
import { MessageDocument, statusEnums } from "../message/model/message.model";

export default (io: Server, socket: Socket) => {
    // Handle room joining for two users
    socket.on("joinRoom", (roomId: string) => {
        socket.join(roomId);
        socket.emit("roomJoined", { roomId, message: "Joined room successfully" });
    });

    // Handle new messages with dynamic chat room creation
    socket.on("message", async (data: { sender: string; receiver: string; message: string }) => {
        const { sender, receiver, message } = data;

        try {
            const savedMessage = await chatService.sendMessage({ sender, receiver, message }) as MessageDocument;

            if (savedMessage?.chatRoom) {
                io.to(savedMessage.chatRoom.toString()).emit("newMessage", savedMessage);
            }
        } catch (error) {
            console.error("Failed to save message:", error);
            socket.emit("error", { message: "Failed to send message" });
        }
    });

    // Handle Message Status updates
    socket.on("messageStatus", async (data: { messageId: string; status: typeof statusEnums[number] }) => {
        const { messageId, status } = data;
        try {
            const updatedMessage = await chatService.updateMessageStatus(messageId, status) as MessageDocument;
            if (updatedMessage?.chatRoom) {
                io.to(updatedMessage.chatRoom.toString()).emit("messageStatusUpdated", {
                    messageId,
                    status: updatedMessage.status,
                });
            }
        } catch (error) {
            console.error("Failed to update message status:", error);
            socket.emit("error", { message: "Failed to update message status" });
        }
    });

    // Handle typing indicator
    socket.on("typing", (roomId: string) => {
        socket.to(roomId).emit("typing", { userId: socket.id });
    });

    // Handle stop typing
    socket.on("stopTyping", (roomId: string) => {
        socket.to(roomId).emit("stopTyping", { userId: socket.id });
    });

    // Handle disconnection
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
};