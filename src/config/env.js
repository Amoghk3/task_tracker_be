const { z } = require("zod");

const envSchema = z.object({
  PORT: z.string().default("3000"),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  NODE_ENV: z.string().optional(),
});

const env = envSchema.parse(process.env);

module.exports = env;