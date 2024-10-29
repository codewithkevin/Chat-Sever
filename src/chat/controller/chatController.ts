import { Request, Response, RequestHandler } from "express";
import * as chatService from "../services/chatServices";

export const sendMessage: RequestHandler = async (req, res) => {
    const { chatRoomId, sender, message } = req.body;

    if (!chatRoomId || !sender || !message) {
        res.status(400).json({ error: "chatRoomId, sender, and message are required" });
        return; // Ends function execution without returning Response
    }

    try {
        const createdMessage = await chatService.createMessage({ chatRoomId, sender, message });
        res.status(201).json(createdMessage); // Ends function execution
    } catch (error) {
        res.status(500).json({ error: "Failed to send message", details: error });
    }
};

export const getMessages: RequestHandler = async (req, res) => {
    const { roomId } = req.params;
    const limit = parseInt(req.query.limit as string, 10) || 20;

    try {
        const messages = await chatService.getMessagesByRoomId(roomId, limit);
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve messages", details: error });
    }
};

export const getChatRoom: RequestHandler = async (req, res) => {
    const { roomId } = req.params;

    try {
        const chatRoom = await chatService.getChatRoomById(roomId);
        if (!chatRoom) {
            res.status(404).json({ error: "Chat room not found" });
            return;
        }
        res.status(200).json(chatRoom); // Ends function execution
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve chat room", details: error });
    }
};