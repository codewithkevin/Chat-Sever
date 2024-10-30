import mongoose, { Schema, Document } from "mongoose";

export interface ChatRoomDocument extends Document {
    members: [string, string];
    createdAt: Date;
    updatedAt: Date;
}

const chatSchema = new Schema<ChatRoomDocument>({
    members: {
        type: [String],
        required: true,
        validate: [(array: string[]) => array.length === 2, 'A direct chat requires exactly two members.']
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

chatSchema.index({ members: 1 });

export const ChatRoom = mongoose.model<ChatRoomDocument>("ChatRoom", chatSchema);