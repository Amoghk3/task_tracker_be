require("dotenv").config();

const app = require("./src/app");
const logger = require("./src/utils/logger");
const prisma = require("./src/config/db");

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
});

// 🔥 GRACEFUL SHUTDOWN (Issue #22)
const shutdown = async (signal) => {
  logger.info(`${signal} received. Shutting down gracefully...`);

  server.close(async () => {
    logger.info("HTTP server closed");

    await prisma.$disconnect();
    logger.info("Prisma disconnected");

    process.exit(0);
  });

  // Force exit after 10s if graceful shutdown fails
  setTimeout(() => {
    logger.error("Forced shutdown after timeout");
    process.exit(1);
  }, 10000);
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));