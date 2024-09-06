const {
    RESPONSE_CODE_CONSTANT,
    ERROR_CODE_CONSTANT,
    OBJECT_TYPE,
} = require("../../constants/code.constant");
const { TYPE } = require("../../constants/conversation.constant");
const {
    Internal,
    Ok,
    ResponseJson,
} = require("../../constants/response.constant");
const ROLE_CONSTANT = require("../../constants/role.constant");
const ConversationModel = require("../../db/models/conversation");
const MemberModel = require("../../db/models/member");
const MessageModel = require("../../db/models/message");
const ConversationMemberService = require("../convertsation-member");

const ConversationService = {
    create: async (userId, body) => {
        const { name, type, memberIds } = body;

        if (!Object.values(TYPE).includes(type)) {
            return {
                success: false,
                status: RESPONSE_CODE_CONSTANT.BAD_REQUEST,
                message: ERROR_CODE_CONSTANT.INVALID(
                    OBJECT_TYPE.CONVERSATION.TYPE
                ),
            };
        }

        const instance = new ConversationModel({
            name: name || "Nhóm mới",
            type: type,
            createAt: new Date(),
            image: "",
        });

        try {
            const conversationSaved = await instance.save();

            const createOwner = await ConversationMemberService.addOwner(
                conversationSaved._id,
                userId,
                ROLE_CONSTANT.ADMINISTRATOR
            );

            if (!createOwner.success) {
                await ConversationModel.findByIdAndDelete({
                    _id: conversationSaved._id,
                });
                return createOwner;
            }

            if (memberIds) {
                await Promise.all(
                    memberIds.map((memberId) =>
                        ConversationMemberService.add(
                            userId,
                            memberId,
                            ROLE_CONSTANT.MEMBER
                        )
                    )
                );
            }

            return Ok(conversationSaved);
        } catch (error) {
            console.error(error);
            return Internal();
        }
    },
    update: () => {},
    delete: () => {},
    list: async (userId, body) => {
        const { page } = body;
        try {
            let [items, count] = await Promise.all([
                MemberModel.find({
                    user: userId,
                    isLeave: false,
                })
                    .limit(10)
                    .skip((page - 1) * 10)
                    .populate("conversation", "_id name"),
                MemberModel.countDocuments({
                    user: userId,
                }),
            ]);

            items = await Promise.all(
                items.map((item) =>
                    ConversationService.getLastestMessage(item.conversation)
                )
            );

            return Ok({ items, page, count });
        } catch (error) {
            console.error(error);
            return Internal();
        }
    },
    detail: async (userId, conversationId) => {
        const isInconversation =
            await ConversationMemberService.isInConversation(
                conversationId,
                userId
            );

        if (!isInconversation.success) {
            return isInconversation;
        }

        const conversationDetail = await ConversationModel.findOne({
            _id: conversationId,
        });
        if (!conversationDetail) {
            return ResponseJson(
                false,
                RESPONSE_CODE_CONSTANT.NOT_FOUND,
                ERROR_CODE_CONSTANT.NOT_EXIST(
                    OBJECT_TYPE.CONVERSATION.MEMBER.BASE
                )
            );
        }

        return Ok(conversationDetail);
    },
    isExist: async (_id) => {
        const conversation = await ConversationModel.findOne({ _id });
        if (!conversation) {
            return ResponseJson(
                false,
                RESPONSE_CODE_CONSTANT.NOT_FOUND,
                ERROR_CODE_CONSTANT.NOT_EXIST(
                    OBJECT_TYPE.CONVERSATION.MEMBER.BASE
                )
            );
        }

        return conversation;
    },
    getLastestMessage: async (conversation) => {
        const lastestMessage = await MessageModel.findOne({
            conversation: conversation._id,
        })
            .select({ _id: true, text: true, type: true, sentAt: true })
            .limit(1)
            .sort({ sentAt: -1 })
            .populate("seens", "_id nickname avatar user")
            .populate("member", "_id nickname");

        return {
            ...conversation.toObject(),
            lastestMessage,
        };
    },
};

module.exports = ConversationService;
