require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const rateLimit = require("express-rate-limit");

// 🔥 Validate env vars at startup (Issues #9, #11)
const env = require("./config/env");
const logger = require("./utils/logger");


// Routes
const authRoutes = require("./modules/auth/auth.routes");
const taskRoutes = require("./modules/tasks/tasks.routes");
const teamRoutes = require("./modules/teams/teams.routes");
const userRoutes = require("./modules/users/users.routes");
const commentRoutes = require("./modules/comments/comments.routes");
const attachmentRoutes = require("./modules/attachments/attachments.routes");

// Middleware
const errorHandler = require("./middleware/errorHandler");

const app = express();

//
// 🔥 SECURITY HEADERS (Issue #9)
//
app.use(helmet());

//
// 🔥 CORS — restricted to configured origin (Issue #8)
//
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());

//
// 🔥 LOGGER (request logging)
//
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

//
// 🔥 RATE LIMITING (apply mainly to auth)
//
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: {
    success: false,
    error: "Too many requests, try again later",
  },
});


//
// 🔥 ROUTES
//
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/users", userRoutes);
app.use("/api", commentRoutes);
app.use("/api", attachmentRoutes);

//
// 🔥 STATIC FILES (attachments)
//
app.use("/uploads", express.static("uploads"));

//
// 🔥 HEALTH CHECK
//
app.get("/", (req, res) => {
  res.json({ message: "API Running 🚀" });
});

//
// 🔥 ERROR HANDLER (ALWAYS LAST)
//
app.use(errorHandler);

module.exports = app;