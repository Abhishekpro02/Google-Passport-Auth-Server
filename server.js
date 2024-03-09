import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import path from "path";
import cookieParser from "cookie-parser";

import "./passport/github.auth.js";

import authRoutes from "./routes/auth.route.js";

import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// cors policy for development
app.use(
  cors({
    origin: "https://google-passport-auth-client.vercel.app",
    credentials: true,
  })
);
const oneWeek = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
app.use(
  session({
    secret: "bjnlkmjlkmgvhvgcgfchgfdcbmjhvmh",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: oneWeek,
      // sameSite: "none",
      // secure: true,
      // httpOnly: true,
    },
  })
);

app.use(cookieParser());
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());
// app.enable("trust proxy");

// Here we can remove the cors, it's not necessary in production because the frontend and backend are on the same domain. I forgot to mention that in the video, sorry about that.🙄
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

app.use("/api/auth", authRoutes);

// app.use(express.static(path.join(__dirname, "/frontend/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// });
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
  connectMongoDB();
});
