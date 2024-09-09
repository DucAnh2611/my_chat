const { Router } = require("express");
const UserService = require("../../services/user");
const appConfigs = require("../../configs");
const { convertTime } = require("../../utils/time");
const refreshTokenCheck = require("../../middlewares/refresh-token");

const AuthRouter = Router();

AuthRouter.post("/login", async (req, res) => {
    const body = req.body;

    const login = await UserService.login(body);
    if (login.success) {
        const { accessToken, refreshToken } = login.result;

        res.cookie(appConfigs.cookies.name, refreshToken, {
            maxAge: convertTime(appConfigs.token.refresh.expire, "ms"),
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        login.result = { accessToken };
    }
    return res.status(login.status).json(login);
});

AuthRouter.get("/refresh", refreshTokenCheck, async (req, res) => {
    const payload = req.refreshPayload;

    const refresh = await UserService.refresh(payload);
    if (refresh.success) {
        const { accessToken, refreshToken } = refresh.result;

        res.cookie(appConfigs.cookies.name, refreshToken, {
            maxAge: convertTime(appConfigs.token.refresh.expire, "ms"),
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        refresh.result = { accessToken };
    }

    return res.status(refresh.status).json(refresh);
});

module.exports = AuthRouter;
