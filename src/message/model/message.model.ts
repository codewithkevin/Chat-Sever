import mongoose, { Schema, Document } from "mongoose";
import { ChatRoomDocument } from '../../chat/model/chatModel';

export const statusEnums = ["sent", "delivered", "read"] as const;
export type MessageType = "text" | "image" | "video" | "audio" | "location" | "file";

export interface MessageInput {
    message: {
        text: string;
        caption?: string;
    };
    sender: string;
    type: MessageType;
    receiver: string;
}

export interface MessageDocument extends MessageInput, Document {
    chatRoom: ChatRoomDocument["_id"];
    status: typeof statusEnums[number];
    isSeen: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const messageSchema = new Schema<MessageDocument>({
    chatRoom: { type: mongoose.Types.ObjectId, ref: "ChatRoom", required: true },
    message: {
        text: { type: String, required: true },
        caption: { type: String, default: "" },
    },
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    type: { type: String, enum: ["text", "image", "video", "audio", "location", "file"], required: true },
    status: { type: String, enum: statusEnums, default: "sent" },
    isSeen: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

messageSchema.index({ chatRoom: 1, sender: 1, receiver: 1 });

export const Message = mongoose.model<MessageDocument>("Message", messageSchema);