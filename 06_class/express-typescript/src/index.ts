import express, { NextFunction, Request, Response } from "express";
import Joi from "joi";
import helmet from "helmet";
import morgan from "morgan";
import debug from "debug";
import dotenv from "dotenv";
import ejs from "ejs";

dotenv.config();

const reqLogger = debug("app:request");
const normalLogger = debug("app:normal");

normalLogger("MAIL username: ", process.env.MAIL_USER_NAME);

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

const logger = (req: Request, res: Response, next: NextFunction) => {
  reqLogger("a request is received ...");
  next();
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet.hidePoweredBy());
app.use(morgan("tiny"));
app.use(logger);

interface BookInterface {
  id: number;
  name: string;
}

const books: BookInterface[] = [
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

app.get("/", (req: Request, res: Response) => {
  res.send("<b>hello world</b>");
});

app.get("/api/books", (req: Request, res: Response) => {
  res.send(books);
});

app.get("/api/books/:id", (req: Request, res: Response) => {
  const book = books.find((x) => x.id === parseInt(req.params.id));

  if (!book) {
    res.status(404).send("book not found");
  }

  res.render("books", {
    name: book?.name,
  });
});

app.post("/api/books", (req: Request, res: Response) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
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

app.put("/api/books/:id", (req: Request, res: Response) => {
  const book = books.find((x) => x.id === parseInt(req.params.id));
  if (!book) {
    res.status(404).send("book not found");
  }

  const schema = Joi.object({
    name: Joi.string().min(3).required(),
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

app.delete("/api/books/:id", (req: Request, res: Response) => {
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
