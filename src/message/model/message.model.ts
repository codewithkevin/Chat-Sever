import mongoose, { Schema, Document } from "mongoose";
import { ChatRoomDocument } from '../../chat/model/chatModel';

export const statusEnums = ["sent", "delivered", "read"] as const;


export interface MessageDocument extends Document {
    chatRoom: ChatRoomDocument["_id"];
    sender: string;
    message: string;
    status: typeof statusEnums[number];
    isSeen: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const messageSchema = new Schema<MessageDocument>({
    message: { type: String, required: true },
    sender: { type: String, required: true },
    chatRoom: { type: mongoose.Types.ObjectId, ref: 'ChatRoom', required: true },
    status: { type: String, enum: statusEnums, default: "sent" },
    isSeen: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const Message = mongoose.model<MessageDocument>("Message", messageSchema);