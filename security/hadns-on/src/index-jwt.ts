/** Create a simple express application handles username-password with passport local strategy */
import express from "express";
import passport from "passport";
import passportLocal from "passport-local";
import passportJwt from "passport-jwt";
import dotenv from "dotenv";
import session, { MemoryStore } from "express-session";
import connectSqlite3 from "connect-sqlite3";
import jwt from "jsonwebtoken";
import "./types";

dotenv.config();

const app = express();
app.use(express.json());

/** JwtStrategy */
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const jwtOptions: passportJwt.StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};
passport.use(
  new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    if (jwtPayload.username === "admin") {
      return done(null, { username: "admin" });
    } else {
      return done(null, false, { message: "Invalid credentials" });
    }
  })
);

/** A simple middleware for checking if isAdmin or not */
const isAdmin: express.RequestHandler = (req, res, next) => {
  if (req.user && req.user.username === "admin") {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
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
    /** sign jwt */
    const token = jwt.sign(
      { username: req.user?.username },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    /**
     * we send token to the client and it's up to the client to store it and send it back to the server in the form of
     * authentication header: Bearer <token>
     */
    res.send({ token });
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

app.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(req.user);
  }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
