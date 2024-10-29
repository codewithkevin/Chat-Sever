import { Server, Socket } from "socket.io";
import * as chatService from "../chat/services/chatServices";
import { Message, statusEnums } from "../message/model/message.model";

export default (io: Server, socket: Socket) => {
    // Handle room joining
    socket.on("joinRoom", (roomId: string) => {
        socket.join(roomId);
        socket.emit("roomJoined", { roomId, message: "Joined room successfully" });
    });

    // Handle new messages
    socket.on("message", async (data: { chatRoomId: string; sender: string; message: string }) => {
        const { chatRoomId, sender, message } = data;
        try {
            const savedMessage = await chatService.createMessage({ chatRoomId, sender, message });
            io.to(chatRoomId).emit("newMessage", savedMessage);
        } catch (error) {
            console.error("Failed to save message:", error);
            socket.emit("error", { message: "Failed to send message" });
        }
    });

    //Handle Message Status
    socket.on("messageStatus", async (data) => {
        const { messageId, status } = data;
        await Message.findByIdAndUpdate(messageId, { status });
        io.to(data.chatRoomId).emit("messageStatus", { messageId, status });
    });
    // socket.on("messageStatus", async (data: { messageId: string; status: typeof statusEnums[number] }) => {
    //     const { messageId, status } = data;
    //     try {
    //         const updatedMessage = await chatService.updateMessageStatus(messageId, status);
    //         io.to(updatedMessage.chatRoom).emit("messageStatusUpdated", updatedMessage);
    //     } catch (error) {
    //         console.error("Failed to update message status:", error);
    //         socket.emit("error", { message: "Failed to update message status" });
    //     }
    // });

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