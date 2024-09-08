const {
    ERROR_CODE_CONSTANT,
    RESPONSE_CODE_CONSTANT,
    OBJECT_TYPE,
} = require("../../constants/code.constant");
const EVENT_EMITTER_CONSTANT = require("../../constants/event-emitter.constant");
const {
    Internal,
    Ok,
    ResponseJson,
} = require("../../constants/response.constant");
const MessageModel = require("../../db/models/message");
const eventEmitter = require("../../event-emiiter");
const ConversationMemberService = require("../convertsation-member");

const MessageService = {
    send: async (userId, body) => {
        const { conversationId, text, type, replyId } = body;

        const isInConversation =
            await ConversationMemberService.isInConversation(
                conversationId,
                userId
            );

        if (!isInConversation.success) {
            return isInConversation;
        }
        if (replyId) {
            const isExistMessage = await MessageService.isExist(
                conversationId,
                replyId
            );

            if (!isExistMessage.success) {
                return isExistMessage;
            }
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
            reply: replyId || null,
            member: isInConversation.result._id,
            sentAt: new Date(),
        });

        try {
            const sendMessage = await newMessage.save();

            const sentMessage = await MessageService.getSentMessage(
                conversationId,
                sendMessage._id
            );

            eventEmitter.emit(EVENT_EMITTER_CONSTANT.EVENT.MESSAGE.SEND, {
                conversationId,
                message: sentMessage,
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
                    })
                    .populate({
                        path: "reply",
                        select: "_id text type emotes isDelete sentAt",
                        populate: {
                            path: "member",
                            select: "_id nickname",
                            populate: {
                                path: "user",
                                select: "_id name avatar status isMe username",
                            },
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
    isExist: async (conversationId, id) => {
        const find = await MessageModel.findOne({
            _id: id,
            conversation: conversationId,
        });

        if (!find) {
            return ResponseJson(
                false,
                RESPONSE_CODE_CONSTANT.BAD_REQUEST,
                ERROR_CODE_CONSTANT.NOT_EXIST(OBJECT_TYPE.MESSSAGE)
            );
        }
        return Ok(find);
    },
    getSentMessage: async (conversationId, id) => {
        const find = await MessageModel.findOne({
            _id: id,
            conversation: conversationId,
        })
            .populate({
                path: "member",
                select: "_id nickname",
                populate: {
                    path: "user",
                    select: "_id name avatar status isMe username",
                },
            })
            .populate({
                path: "reply",
                select: "_id text type emotes isDelete sentAt",
                populate: {
                    path: "member",
                    select: "_id nickname",
                    populate: {
                        path: "user",
                        select: "_id name avatar status isMe username",
                    },
                },
            });
        return find;
    },
};

module.exports = MessageService;
