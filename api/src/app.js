import express from "express";
import { createServer } from "http";
import ListingRouter from "./routes/listing/listing.routes.js";
import userRouter from "./routes/auth/users.routes.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "./models/auth/users.models.js";

const app = express();

const httpServer = createServer(app);

// cookie parser:
// app.use(cookieParser("secret"));

const sessionInfo = {
  secret: "Mysecretxyzcodek",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60,
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
  },
};

// express-session:
app.use(session(sessionInfo));

// body parser: to parse body data passes through request.
app.use(express.json());
app.use(express.urlencoded());

// passport setup:
app.use(passport.initialize()); // initializing the passport.
app.use(passport.session());
passport.use(new Strategy(User.authenticate()));

// storing and removing session information:
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// setting path for static file:
app.use(express.static("public"));

// middleware test:
app.use((req, res, next) => {
  console.log("Hey! middleware tested.🤗");
  next();
});

// routes:
app.use("/api/v1/listing", ListingRouter);
app.use("/api/v1/user", userRouter);

// app.post("/login", (req, res) => {
//   let data = req.body;
//   // req.session.username = req.body.username;
//   // res.cookie("username", data.username, {
//   //   signed: true,
//   // });

//   res.send("You Logged In. Successfully");
// });

export { httpServer };
