const { Router } = require("express");
const accessTokenCheck = require("../../middlewares/access-token");
const MessageService = require("../../services/message");

const MessageRouter = Router();

MessageRouter.get("/conversation/:id", accessTokenCheck, async (req, res) => {
    const { id } = req.params;
    const { skip } = req.query;
    const { _id } = req.accessPayload;

    const conversationMessage = await MessageService.conversation({
        userId: _id,
        conversationId: id,
        skip: skip || 0,
    });

    return res.status(conversationMessage.status).json(conversationMessage);
});

MessageRouter.post("/send", accessTokenCheck, async (req, res) => {
    const body = req.body;
    const { _id } = req.accessPayload;

    const sendMessage = await MessageService.send(_id, body);

    return res.status(sendMessage.status).json(sendMessage);
});

module.exports = MessageRouter;
