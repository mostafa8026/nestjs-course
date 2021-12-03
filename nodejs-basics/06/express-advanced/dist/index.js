"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = require("./middleware/logger");
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const debug_1 = __importDefault(require("debug"));
const dotenv_1 = __importDefault(require("dotenv"));
const books_1 = require("./routes/books");
const env = dotenv_1.default.config();
console.log(env.parsed);
console.log(env.error);
const debug = debug_1.default.debug("app");
debug("asdfasdf");
const app = (0, express_1.default)(); // const app: Express = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("dist/public"));
app.use(helmet_1.default.hidePoweredBy());
const domain = app.get("env");
console.log(domain);
if (domain == "development") {
    app.use((0, morgan_1.default)("tiny"));
    app.use(logger_1.logger);
}
app.use("/api/books", books_1.router);
app.get("/", (req, res) => {
    res.render("index", {
        title: "Yes it does.",
    });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Start listening on port ${port}`);
});
