import mongoose, { Schema, Document } from "mongoose";

export interface ChatRoomDocument extends Document {
    groupName?: string;
    isGroupChat?: boolean;
    groupProfile?: string;
    members: string[];
    createdAt: Date;
    updatedAt: Date;
}

const chatSchema = new Schema<ChatRoomDocument>({
    groupName: { type: String, required: function () { return this.isGroupChat; } },
    isGroupChat: { type: Boolean, default: false },
    members: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const ChatRoom = mongoose.model<ChatRoomDocument>("ChatRoom", chatSchema);