const EVENT_EMITTER_CONSTANT = require("../../constants/event-emitter.constant");
const { Internal, Ok } = require("../../constants/response.constant");
const MessageModel = require("../../db/models/message");
const eventEmitter = require("../../event-emiiter");
const ConversationMemberService = require("../convertsation-member");

const MessageService = {
    send: async (userId, body) => {
        const { conversationId, text, type } = body;

        const isInConversation =
            await ConversationMemberService.isInConversation(
                conversationId,
                userId
            );

        if (!isInConversation.success) {
            return isInConversation;
        }

        const newMessage = new MessageModel({
            conversation: conversationId,
            emotes: [],
            isDelete: false,
            isPin: false,
            pinBy: undefined,
            seens: [],
            text,
            type: type,
            member: isInConversation.result._id,
            sentAt: new Date(),
        });

        try {
            const sendMessage = await newMessage.save();

            eventEmitter.emit(EVENT_EMITTER_CONSTANT.EVENT.MESSAGE.SEND, {
                conversationId,
                message: sendMessage,
                member: isInConversation.result,
            });

            return Ok(sendMessage);
        } catch (error) {
            console.error(error);
            return Internal();
        }
    },
    conversation: async (body) => {
        const { userId, conversationId, skip } = body;
        const isInConversation =
            await ConversationMemberService.isInConversation(
                conversationId,
                userId
            );

        if (!isInConversation.success) {
            return isInConversation;
        }
        try {
            const [items, count] = await Promise.all([
                MessageModel.find({
                    conversation: conversationId,
                })
                    .sort({ sentAt: -1 })
                    .limit(30)
                    .skip(skip)
                    .populate({
                        path: "member",
                        select: "_id nickname",
                        populate: {
                            path: "user",
                            select: "_id name avatar status isMe username",
                        },
                    }),
                MessageModel.countDocuments({
                    member: isInConversation.result._id,
                }),
            ]);

            return Ok({ items, skip: skip, count });
        } catch (error) {
            console.log(error);
            return Internal();
        }
    },
};

module.exports = MessageService;
