"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const joi_1 = __importDefault(require("joi"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const debug_1 = __importDefault(require("debug"));
const dotenv_1 = __importDefault(require("dotenv"));
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
const books = [
    {
        id: 1,
        name: "book 1",
    },
    {
        id: 2,
        name: "book 2",
    },
    {
        id: 3,
        name: "book 3",
    },
];
app.get("/", (req, res) => {
    res.send("<b>hello world</b>");
});
app.get("/api/books", (req, res) => {
    res.send(books);
});
app.get("/api/books/:id", (req, res) => {
    const book = books.find((x) => x.id === parseInt(req.params.id));
    if (!book) {
        res.status(404).send("book not found");
    }
    res.render("books", {
        name: book === null || book === void 0 ? void 0 : book.name,
    });
});
app.post("/api/books", (req, res) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(3).required(),
    });
    const result = schema.validate(req.body);
    normalLogger(result);
    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }
    const book = {
        id: books.length + 1,
        name: req.body.name,
    };
    books.push(book);
    res.send(book);
});
app.put("/api/books/:id", (req, res) => {
    const book = books.find((x) => x.id === parseInt(req.params.id));
    if (!book) {
        res.status(404).send("book not found");
    }
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(3).required(),
    });
    const result = schema.validate(req.body);
    normalLogger(result);
    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }
    if (book) {
        book.name = req.body.name;
    }
    res.send(book);
});
app.delete("/api/books/:id", (req, res) => {
    const book = books.find((x) => x.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).send("Book not found");
    }
    if (book) {
        const index = books.indexOf(book);
        books.splice(index, 1);
    }
    res.send(book);
});
normalLogger(app.get("env"));
const port = process.env.PORT || 3000;
app.listen(port, () => {
    normalLogger(`Start listening on port ${port}`);
});
