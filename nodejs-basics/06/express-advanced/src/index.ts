import express, { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { logger } from "./middleware/logger";
import helmet from "helmet";
import morgan from "morgan";
import { configuration } from "./config";
import Debug from "debug";
import dotenv from "dotenv";
import ejs from "ejs";
import { router as books } from "./routes/books";

const env = dotenv.config();
console.log(env.parsed);
console.log(env.error);

const debug = Debug.debug("app");
debug("asdfasdf");

const app = express(); // const app: Express = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("dist/public"));
app.use(helmet.hidePoweredBy());

const domain = app.get("env");
console.log(domain);
if (domain == "development") {
  app.use(morgan("tiny"));
  app.use(logger);
}

app.use("/api/books", books);

app.get("/", (req: Request, res: Response) => {
  res.render("index", {
    title: "Yes it does.",
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Start listening on port ${port}`);
});
