const {
    RESPONSE_CODE_CONSTANT,
    ERROR_CODE_CONSTANT,
    OBJECT_TYPE,
} = require("../../constants/code.constant");
const {
    Internal,
    Ok,
    ResponseJson,
} = require("../../constants/response.constant");
const ROLE_CONSTANT = require("../../constants/role.constant");
const MemberModel = require("../../db/models/member");
const UserService = require("../user");

const ConversationMemberService = {
    addOwner: async (conversationId, userId, role) => {
        const user = await UserService.detail(userId);

        const newMember = new MemberModel({
            user: userId,
            conversation: conversationId,
            role: role,
            nickname: user.result.name,
            isLeave: false,
            joinAt: new Date(),
            leaveAt: null,
            configs: {
                notification: {
                    turnOff: false,
                    offDuration: 0,
                },
            },
        });

        try {
            const saved = await newMember.save();
            return Ok(saved);
        } catch (error) {
            console.error(error);
            return Internal();
        }
    },
    add: async (body) => {
        const { conversationId, userId, memberId, role } = body;
        const isAdmin = await ConversationMemberService.isAdmin(userId);
        if (!isAdmin) {
            return isAdmin;
        }

        const isExist = await ConversationMemberService.isExist(
            conversationId,
            memberId
        );
        if (isExist) {
            return ResponseJson(
                false,
                RESPONSE_CODE_CONSTANT.BAD_REQUEST,
                ERROR_CODE_CONSTANT.EXIST(OBJECT_TYPE.CONVERSATION.MEMBER.BASE)
            );
        }

        const user = await UserService.detail(memberId);

        const newMember = new MemberModel({
            user: memberId,
            conversation: conversationId,
            role: role,
            nickname: user.result.name,
            isLeave: false,
            joinAt: new Date(),
            leaveAt: null,
            configs: {
                notification: {
                    turnOff: false,
                    offDuration: 0,
                },
            },
        });

        try {
            const saved = await newMember.save();
            return Ok(saved);
        } catch (error) {
            console.error(error);
            return Internal();
        }
    },
    update: () => {},
    grand: () => {},
    leave: () => {},
    isExist: async (conversationId, memberId) => {
        const find = await MemberModel.findOne({
            conversation: conversationId,
            user: memberId,
        });
        return find;
    },
    getMember: async (userId) => {
        const member = await MemberModel.findOne({ user: userId });
        if (!member) {
            return ResponseJson(
                false,
                RESPONSE_CODE_CONSTANT.NOT_FOUND,
                ERROR_CODE_CONSTANT.NOT_EXIST(OBJECT_TYPE.CONVERSATION.MEMBER)
            );
        }

        return member;
    },
    isAdmin: async (userId) => {
        const isExist = await UserService.isExist(userId);
        if (!isExist) {
            return ResponseJson(
                false,
                RESPONSE_CODE_CONSTANT.NOT_FOUND,
                ERROR_CODE_CONSTANT.NOT_EXIST(OBJECT_TYPE.USER.BASE)
            );
        }

        if (isExist.role === ROLE_CONSTANT.ADMINISTRATOR) {
            return ResponseJson(
                false,
                RESPONSE_CODE_CONSTANT.NOT_FOUND,
                ERROR_CODE_CONSTANT.INVALID(
                    OBJECT_TYPE.CONVERSATION.MEMBER.ROLE
                )
            );
        }
        return isExist;
    },
    isInConversation: async (conversationId, userId) => {
        const find = await MemberModel.findOne({
            conversation: conversationId,
            user: userId,
            isLeave: false,
        }).populate("user", "_id name username avatar status isMe");

        if (!find) {
            return ResponseJson(
                false,
                RESPONSE_CODE_CONSTANT.NOT_FOUND,
                ERROR_CODE_CONSTANT.NOT_EXIST(
                    OBJECT_TYPE.CONVERSATION.MEMBER.BASE
                )
            );
        }

        return Ok(find);
    },
};

module.exports = ConversationMemberService;
