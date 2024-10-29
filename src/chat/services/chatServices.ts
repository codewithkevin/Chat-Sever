import { ChatRoom, ChatRoomDocument } from '../model/chatModel';
import { Message, MessageDocument } from '../../message/model/message.model';

export interface CreateMessageParams {
    chatRoomId: string;
    sender: string;
    message: string;
}
interface CreateChatRoomParams {
    groupName?: string;
    isGroupChat?: boolean;
    members: string[];
}

export const createChatRoom = async ({
    groupName,
    isGroupChat = false,
    members,
}: CreateChatRoomParams) => {
    const newChatRoom = new ChatRoom({
        groupName: isGroupChat ? groupName : undefined,
        isGroupChat,
        members,
    });
    return await newChatRoom.save();
}

export const getChatRoomById = async (roomId: string): Promise<ChatRoomDocument | null> => {
    return await ChatRoom.findById(roomId).populate("members").exec();
};

export const createMessage = async ({
    chatRoomId,
    sender,
    message,
}: CreateMessageParams): Promise<MessageDocument> => {
    const newMessage = new Message({
        chatRoom: chatRoomId,
        sender,
        message,
    });
    return await newMessage.save();
};

export const getMessagesByRoomId = async (roomId: string, limit = 20): Promise<MessageDocument[]> => {
    return await Message.find({ chatRoom: roomId })
        .sort({ createdAt: -1 })
        .limit(limit)
        .exec();
};