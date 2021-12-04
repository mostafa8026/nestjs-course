"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const debug_1 = __importDefault(require("debug"));
const dotenv_1 = __importDefault(require("dotenv"));
const books_1 = require("./routes/books");
const home_1 = require("./routes/home");
dotenv_1.default.config();
const reqLogger = (0, debug_1.default)("app:request");
const normalLogger = (0, debug_1.default)("app:normal");
normalLogger("MAIL username: ", process.env.MAIL_USER_NAME);
const app = (0, express_1.default)();
app.set("view engine", "ejs");
app.set("views", "./views");
const logger = (req, res, next) => {
    reqLogger("a request is received ...");
    next();
};
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public"));
app.use(helmet_1.default.hidePoweredBy());
app.use((0, morgan_1.default)("tiny"));
app.use(logger);
app.use("/api/books", books_1.route);
app.use("/", home_1.route);
normalLogger(app.get("env"));
const port = process.env.PORT || 3000;
app.listen(port, () => {
    normalLogger(`Start listening on port ${port}`);
});
