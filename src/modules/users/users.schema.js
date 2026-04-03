const { z } = require("zod");

// 🔥 UPDATE VALIDATION (STRICT)
const updateUserSchema = z.object({
  name: z.string().min(2),
});

module.exports = {
  updateUserSchema,
};