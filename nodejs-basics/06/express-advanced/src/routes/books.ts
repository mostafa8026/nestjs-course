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

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send(books);
});

router.get("/:id", (req: Request, res: Response) => {
  const book = books.find((x) => x.id === parseInt(req.params.id));

  if (!book) {
    res.status(404).send("book not found");
  }

  res.send(book);
});

router.post("", (req: Request, res: Response) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const result = schema.validate(req.body);
  console.log(result);

  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  const book: BookInterface = {
    id: books.length + 1,
    name: req.body.name,
  };

  books.push(book);

  res.send(book);
});

router.put("/:id", (req: Request, res: Response) => {
  const book = books.find((x) => x.id === parseInt(req.params.id));
  if (!book) {
    res.status(404).send("book not found");
  }

  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const result = schema.validate(req.body);
  console.log(result);

  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  (book as BookInterface).name = req.body.name;

  res.send(book);
});

router.delete("/:id", (req: Request, res: Response) => {
  const book = books.find((x) => x.id === parseInt(req.params.id));
  const index = books.indexOf(book as BookInterface);
  books.splice(index, 1);

  res.send(book);
});

export { router };
