const { z } = require("zod");

const createTaskSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high", "urgent"]).optional(),
  status: z.enum(["todo", "in_progress", "completed", "archived"]).optional(),
  dueDate: z.string().datetime().optional(),
  teamId: z.string().uuid(),
  assignedTo: z.string().uuid().optional(),
});

const updateTaskSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().optional(),
  status: z.enum(["todo", "in_progress", "completed", "archived"]).optional(),
  priority: z.enum(["low", "medium", "high", "urgent"]).optional(),
  dueDate: z.string().datetime().optional(),
  assignedTo: z.string().uuid().optional(),
});

module.exports = {
  createTaskSchema,
  updateTaskSchema,
};