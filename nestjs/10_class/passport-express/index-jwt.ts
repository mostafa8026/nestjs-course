import express from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";
import connectSqlite3 from "connect-sqlite3";
import sqlite3 from "sqlite3";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";

dotenv.config();

const app = express();
app.use(express.json());

const localStrategy = new LocalStrategy((username, password, done) => {
  try {
    done(null, { username, password });
  } catch (err) {
    done(err, false);
  }
});

const signupStrategy = new LocalStrategy((username, password, done) => {
  try {
    if (username === "admin" && password === "admin") {
      done(null, { username: "admin" }, { message: "User was ok ..." });
    } else {
      done(null, false, { message: "User not found" });
    }
  } catch (err) {
    done(err, false);
  }
});

const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string,
  },
  (payload, done) => {
    console.log("jwt authenticating");
    done(null, payload);
  }
);

// add strategy
passport.use("login", localStrategy);
passport.use("signup", signupStrategy);
passport.use("jwt", jwtStrategy);

app.post(
  "/login",
  passport.authenticate("login", { session: false }),
  (req: any, res) => {
    console.log(process.env.JWT_SECRET);
    const token = jwt.sign(
      { username: req.user?.username },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    return res.send({ token });
  }
);

app.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.send(req.user);
  }
);

app.post("/logout", (req, res) => {
  req.logOut((err) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Successfully logged out");
    }
  });
});

app.listen(2000, () => {
  console.log("Start listening on http://localhost:2000");
});
