const express = require("express");
const router = express.Router();

const controller = require("./comments.controller");
const authenticate = require("../../middleware/authenticate");
const validate = require("../../middleware/validate");
const { createCommentSchema } = require("./comments.schema");

// ===============================
// COMMENT ROUTES (Protected)
// ===============================

// Add comment to a task
router.post("/tasks/:taskId/comments", authenticate, validate(createCommentSchema), controller.addComment);

// Get all comments for a task
router.get("/tasks/:taskId/comments", authenticate, controller.getComments);

// Delete a comment (only creator allowed)
router.delete("/comments/:id", authenticate, controller.deleteComment);

module.exports = router;