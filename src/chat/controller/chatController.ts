import { Request, Response, RequestHandler } from "express";
import * as chatService from "../services/chatServices";

// export const createChatRoom: RequestHandler = async (req: Request, res: Response): Promise<void> => {
//     const { members } = req.body;

//     if (!members || members.length !== 2) {
//         res.status(400).json({ error: "Exactly two members are required to create a direct chat room." });
//         return;
//     }

//     try {
//         const newChatRoom = await chatService.createChatRoom({ members });
//         res.status(201).json(newChatRoom);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to create chat room", details: error });
//     }
// };

export const sendMessage: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { sender, receiver, message, type } = req.body;

    if (!sender || !receiver || !message) {
        res.status(400).json({ error: "Sender, receiver, and message are required" });
        return;
    }

    try {
        const createdMessage = await chatService.sendMessage({ sender, receiver, message, type });
        res.status(201).json(createdMessage);
    } catch (error) {
        res.status(500).json({ error: "Failed to send message", details: error });
    }
};

export const getMessages: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { roomId } = req.params;
    const limit = parseInt(req.query.limit as string, 10) || 20;

    try {
        const messages = await chatService.getMessagesByRoomId(roomId, limit);
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve messages", details: error });
    }
};

export const getChatRoom: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { roomId } = req.params;

    try {
        const chatRoom = await chatService.getChatRoomById(roomId);
        if (!chatRoom) {
            res.status(404).json({ error: "Chat room not found" });
            return;
        }
        res.status(200).json(chatRoom);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve chat room", details: error });
    }
};