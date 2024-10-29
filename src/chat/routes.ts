import express from "express";
import * as chatController from "./controller/chatController"


const router = express.Router();

router.post("/message", chatController.sendMessage);

router.get("/messages/:roomId", chatController.getMessages);

router.get("/room/:roomId", chatController.getChatRoom);

router.post("/room", chatController.createChatRoom);

export default router;