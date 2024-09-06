const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const multer = require("multer");
const { initDatabase } = require("./db");
const appConfigs = require("./configs");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const accessTokenCheck = require("./middlewares/access-token");
const UserService = require("./services/user");
const { Ok } = require("./constants/response.constant");
const eventEmitter = require("./event-emiiter");
const EVENT_EMITTER_CONSTANT = require("./constants/event-emitter.constant");
const MessageService = require("./services/message");
const ConversationService = require("./services/conversation");
const AuthRouter = require("./controllers/auth");
const ConversationRouter = require("./controllers/conversation");
const MessageRouter = require("./controllers/message");
const initSocket = require("./socket");
const UserRouter = require("./controllers/user");
const ConversationMemberService = require("./services/convertsation-member");
const ROLE_CONSTANT = require("./constants/role.constant");

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: appConfigs.frontend.origin.split(" "),
        methods: ["GET", "POST"],
    },
});

// const upload = multer({ dest: "uploads/" });

app.use(
    cors({
        origin: appConfigs.frontend.origin.split(" "),
        methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
        credentials: true,
    })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

initDatabase();
initSocket(io);

app.use("/auth", AuthRouter);
app.use("/conversation", ConversationRouter);
app.use("/message", MessageRouter);
app.use("/user", UserRouter);

server.listen(appConfigs.app.port, () => {
    console.log("Server listening on port", appConfigs.app.port);
});
