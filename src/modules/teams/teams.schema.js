const { z } = require("zod");

// CREATE TEAM
const createTeamSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
});

// ADD MEMBER
const addMemberSchema = z.object({
  userId: z.string().uuid(),
  role: z.enum(["admin", "member"]).optional(),
});

module.exports = {
  createTeamSchema,
  addMemberSchema,
};