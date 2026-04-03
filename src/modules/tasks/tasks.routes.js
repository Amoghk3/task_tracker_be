const express = require("express");
const router = express.Router();

const controller = require("./tasks.controller");
const authenticate = require("../../middleware/authenticate");
const validate = require("../../middleware/validate");
const { createTaskSchema, updateTaskSchema } = require("./tasks.schema");

// ===============================
// TASK ROUTES (Protected)
// ===============================

// Create a new task in a team
router.post("/", authenticate, validate(createTaskSchema), controller.createTask);

// Get all tasks (filtered by user teams)
router.get("/", authenticate, controller.getTasks);

// Update task details (status, priority, etc.)
router.patch("/:id", authenticate, validate(updateTaskSchema), controller.updateTask);

// Soft delete task (mark as archived)
router.delete("/:id", authenticate, controller.deleteTask);

// Assign task to another team member
router.patch("/:id/assign", authenticate, controller.assignTask);

module.exports = router;