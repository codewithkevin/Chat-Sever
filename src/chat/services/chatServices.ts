import { ChatRoom, ChatRoomDocument } from '../model/chatModel';
import { Message, MessageDocument, MessageInput, statusEnums } from '../../message/model/message.model';


export const getChatRoomById = async (roomId: string): Promise<ChatRoomDocument | null> => {
    return await ChatRoom.findById(roomId).populate("members").exec();
};

export const sendMessage = async ({ sender, receiver, message, type }: MessageInput): Promise<MessageDocument> => {
    const members = [sender, receiver].sort();

    // Check if a chat room exists for the two members
    let chatRoom = await ChatRoom.findOne({ members }).exec();

    // If no chat room exists, create one
    if (!chatRoom) {
        chatRoom = new ChatRoom({ members });
        await chatRoom.save();
    }

    // Save the message in the chat room
    const newMessage = new Message({
        chatRoom: chatRoom._id,
        sender,
        message,
        receiver,
        type,
        status: "sent",
    });


    return await newMessage.save();
};

export const updateMessageStatus = async (
    messageId: string,
    status: typeof statusEnums[number]
): Promise<MessageDocument | null> => {
    return await Message.findByIdAndUpdate(
        messageId,
        { status },
        { new: true }
    ).exec();
};

export const getMessagesByRoomId = async (roomId: string, limit = 20): Promise<MessageDocument[]> => {
    return await Message.find({ chatRoom: roomId })
        .sort({ createdAt: -1 })
        .limit(limit)
        .exec();
};



