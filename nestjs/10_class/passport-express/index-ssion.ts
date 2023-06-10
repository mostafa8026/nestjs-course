import express from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";
import connectSqlite3 from "connect-sqlite3";
import sqlite3 from "sqlite3";

const SQLiteStore = connectSqlite3(session);

const app = express();
app.use(express.json());
app.use(
  session({
    secret: "some secret",
    store: new SQLiteStore({
      db: "session.sqlite",
    }) as any,
  })
);
app.use(passport.authenticate("session"));

passport.serializeUser((user: any, done) => {
  done(null, {
    id: user.username,
  });
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

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

// add strategy
passport.use("login", localStrategy);
passport.use("signup", signupStrategy);

const isAuthenticated: express.RequestHandler = (req, res, next) => {
  console.log("authenticating", req.user);
  if (req.user) next();
  // why "route"? because we want to skip the rest of the middleware
  else next("route");
};

app.post("/login", passport.authenticate("login"), (req, res) => {
  return res.send("You are logged in.");
});

app.get("/profile", isAuthenticated, (req, res) => {
  return res.send(req.user);
});

app.get("/session-dump", (req, res) => {
  const db = new sqlite3.Database("session.sqlite");
  db.all("SELECT * FROM sessions", (err, rows) => {
    if (err) {
      console.error(err.message);
      res.sendStatus(500);
    } else {
      res.json(rows);
    }
  });
});

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
