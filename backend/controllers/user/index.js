const { Router } = require("express");
const accessTokenCheck = require("../../middlewares/access-token");
const UserService = require("../../services/user");

const UserRouter = Router();

UserRouter.get("/me", accessTokenCheck, async (req, res) => {
    const { _id } = req.accessPayload;

    const me = await UserService.detail(_id);

    return res.status(me.status).json(me);
});

UserRouter.get("/find", accessTokenCheck, async (req, res) => {
    const { _id } = req.accessPayload;
    const { username, skip } = req.query;

    const list = await UserService.find(_id, { username, skip });

    return res.status(list.status).json(list);
});

module.exports = UserRouter;
