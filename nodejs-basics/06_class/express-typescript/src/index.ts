import express, { NextFunction, Request, Response } from "express";
import Joi from "joi";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import ejs from "ejs";
import { route as bookRoute } from "./routes/books";
import { route as homeRoute } from "./routes/home";
import { normalLogger, reqLogger } from "./debug-loggers";
import { logger } from './custome-middlewares/logger'

dotenv.config();

normalLogger("MAIL username: ", process.env.MAIL_USER_NAME);

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet.hidePoweredBy());
app.use(morgan("tiny"));
app.use(logger);
app.use("/api/books", bookRoute);
app.use("/", homeRoute);

normalLogger(app.get("env"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  normalLogger(`Start listening on port ${port}`);
});
