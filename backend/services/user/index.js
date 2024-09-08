const appConfigs = require("../../configs");
const {
    ERROR_CODE_CONSTANT,
    RESPONSE_CODE_CONSTANT,
} = require("../../constants/code.constant");
const { Ok } = require("../../constants/response.constant");
const UserModel = require("../../db/models/user");
const { decrypt, encrypt } = require("../../utils/encrypt");
const { convertTime } = require("../../utils/time");
const { generateToken } = require("../../utils/token");
const { ObjectId } = require("mongodb");

const UserService = {
    login: async (body) => {
        const { username, password } = body;
        let userFind = await UserModel.findOne({ username });

        if (!userFind) {
            const decryptPassword = encrypt(password);
            const newUser = new UserModel({
                avatar: "",
                username,
                password: decryptPassword,
                name: username,
                isMe: false,
                status: "",
                description: "",
            });
            try {
                userFind = await newUser.save();
            } catch (err) {
                console.log(err);
                return {
                    success: false,
                    status: RESPONSE_CODE_CONSTANT.INTERNAL,
                    message: ERROR_CODE_CONSTANT.INTERNAL,
                };
            }
        }

        const userPassword = await decrypt(userFind.password);

        if (userPassword !== password) {
            return {
                success: false,
                status: RESPONSE_CODE_CONSTANT.BAD_REQUEST,
                message: ERROR_CODE_CONSTANT.NOT_MATCH_PASSWORD,
            };
        }

        const userData = {
            _id: userFind._id,
            username: userFind.username,
            isMe: userFind.isMe,
        };

        const accessToken = generateToken(
            userData,
            appConfigs.token.access.key,
            {
                expiresIn: convertTime(appConfigs.token.access.expire, "s"),
            }
        );

        const refreshToken = generateToken(
            userData,
            appConfigs.token.refresh.key,
            {
                expiresIn: convertTime(appConfigs.token.refresh.expire, "s"),
            }
        );

        return {
            success: true,
            status: RESPONSE_CODE_CONSTANT.SUCCESS,
            result: {
                accessToken,
                refreshToken,
            },
        };
    },
    update: async (_id, body) => {
        const { name, avatar } = body;

        let userFind = await UserModel.findOne({ $where: { _id } });

        if (!userFind) {
            return {
                success: false,
                status: RESPONSE_CODE_CONSTANT.BAD_REQUEST,
                message: ERROR_CODE_CONSTANT.NOT_EXIST("user"),
            };
        }
        try {
            const updateUser = await UserModel.updateOne(
                { $where: { _id } },
                {
                    name: name || userFind.name,
                    avatar: avatar || userFind.avatar,
                }
            );
            return updateUser;
        } catch (err) {
            return {
                success: false,
                status: RESPONSE_CODE_CONSTANT.INTERNAL,
                message: ERROR_CODE_CONSTANT.INTERNAL,
            };
        }
    },
    refresh: async (body) => {
        const { _id, username } = body;

        const user = await UserModel.findOne({ username, _id: _id });
        if (!user) {
            return {
                success: false,
                status: RESPONSE_CODE_CONSTANT.BAD_REQUEST,
                message: ERROR_CODE_CONSTANT.NOT_EXIST("user"),
            };
        }

        const userData = {
            _id,
            username,
            isMe: user.isMe,
        };

        const accessToken = generateToken(
            userData,
            appConfigs.token.access.key,
            {
                expiresIn: convertTime(appConfigs.token.access.expire),
            }
        );

        const newRefreshToken = generateToken(
            userData,
            appConfigs.token.refresh.key,
            {
                expiresIn: convertTime(appConfigs.token.refresh.expire),
            }
        );

        return Ok({
            accessToken,
            refreshToken: newRefreshToken,
        });
    },
    detail: async (_id) => {
        let userFind = await UserModel.findOne({ _id }).select({
            name: true,
            username: true,
            avatar: true,
            status: true,
            isMe: true,
            description: true,
        });
        if (!userFind) {
            return {
                success: false,
                status: RESPONSE_CODE_CONSTANT.NOT_FOUND,
                message: ERROR_CODE_CONSTANT.NOT_EXIST("user"),
            };
        }

        return {
            success: true,
            status: RESPONSE_CODE_CONSTANT.SUCCESS,
            result: userFind,
        };
    },
    isExist: async (_id) => {
        const user = await UserModel.findOne({ _id });

        return user;
    },
    find: async (userId, body) => {
        const { username, skip } = body;

        const find = await UserModel.find({
            username: {
                $regex: `.*${username}.*`,
            },
            _id: {
                $ne: new ObjectId(userId),
            },
        })
            .select({
                _id: true,
                avatar: true,
                name: true,
                username: true,
                status: true,
            })
            .skip(skip);

        return Ok(find);
    },
};

module.exports = UserService;
