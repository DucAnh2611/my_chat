const { Router } = require("express");
const accessTokenCheck = require("../../middlewares/access-token");
const ConversationService = require("../../services/conversation");

const ConversationRouter = Router();

ConversationRouter.post("/", accessTokenCheck, async (req, res) => {
    const body = req.body;
    const { _id } = req.accessPayload;

    const createConversation = await ConversationService.create(_id, body);

    return res.status(createConversation.status).json(createConversation);
});

ConversationRouter.get("/list", accessTokenCheck, async (req, res) => {
    const { page } = req.query;
    const { _id } = req.accessPayload;

    const createConversation = await ConversationService.list(_id, { page });

    return res.status(createConversation.status).json(createConversation);
});

ConversationRouter.get("/:id", accessTokenCheck, async (req, res) => {
    const { id: conversationId } = req.params;
    const { _id: userId } = req.accessPayload;

    const detail = await ConversationService.detail(userId, conversationId);

    return res.status(detail.status).json(detail);
});

module.exports = ConversationRouter;
