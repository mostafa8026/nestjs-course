import express, { NextFunction, Request, Response } from "express";
import Joi from "joi";

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

const route = express.Router();
route.get("/", (req: Request, res: Response) => {
  res.send(books);
});

route.get("/:id", (req: Request, res: Response) => {
  const book = books.find((x) => x.id === parseInt(req.params.id));

  if (!book) {
    res.status(404).send("book not found");
  }

  res.render("books", {
    name: book?.name,
  });
});

route.post("/", (req: Request, res: Response) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const result = schema.validate(req.body);

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

route.put("/:id", (req: Request, res: Response) => {
  const book = books.find((x) => x.id === parseInt(req.params.id));
  if (!book) {
    res.status(404).send("book not found");
  }

  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }
  if (book) {
    book.name = req.body.name;
  }

  res.send(book);
});

route.delete("/:id", (req: Request, res: Response) => {
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

export { route };
