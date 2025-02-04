/** Create a simple express application handles username-password with passport local strategy */
import express from "express";
import passport from "passport";
import passportLocal from "passport-local";
import dotenv from "dotenv";
import session, { MemoryStore } from "express-session";
import connectSqlite3 from "connect-sqlite3";
import sqlite3 from "sqlite3";
import "./types";

const SQLiteStore = connectSqlite3(session);

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({
      db: "database.sqlite", // The path to the SQLite database
    }) as any,
  })
);
app.use(passport.authenticate("session"));

passport.serializeUser(function (user: Express.User, cb) {
  cb(null, { username: user.username });
});

passport.deserializeUser(function (user: Express.User, cb) {
  return cb(null, user);
});

/** A simple middleware for checking if isAdmin or not */
const isAdmin: express.RequestHandler = (req, res, next) => {
  if (req.user && req.user.username === "admin") {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

const isAuthenticated: express.RequestHandler = (req, res, next) => {
  if (req.user) next();
  // why "route"? because we want to skip the rest of the middleware
  else next("route");
};

const LocalStrategy = passportLocal.Strategy;
passport.use(
  new LocalStrategy((username, password, done) => {
    if (username === "admin" && password === "admin") {
      return done(null, { username: "admin" });
    } else {
      return done(null, false, { message: "Invalid credentials" });
    }
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

/** curl  */
app.post(
  "/login",
  passport.authenticate("local", {
    // session: false,
    // successRedirect: '/success',
    // failureRedirect: '/failure'
  }),
  (req, res) => {
    res.send(req.user);
  }
);

app.get("/success", (req, res) => {
  res.send("Login success");
});

app.get("/failure", (req, res) => {
  res.send("Login failure");
});

app.get("/admin", isAdmin, (req, res) => {
  res.send("Admin page");
});

app.get("/session-dump", (req, res) => {
  const db = new sqlite3.Database("database.sqlite");
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
  req.logout((err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.send("Logged out");
    }
  });
});

app.get("/profile", isAuthenticated, (req, res) => {
  res.send(`Profile page of ${JSON.stringify(req.user)}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
