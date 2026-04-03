const express = require("express");
const router = express.Router();

const controller = require("./users.controller");
const authenticate = require("../../middleware/authenticate");
const validate = require("../../middleware/validate");
const { updateUserSchema } = require("./users.schema");

// ===============================
// USER ROUTES (Protected)
// ===============================

// Get current logged-in user
router.get("/me", authenticate, controller.getMe);

// Update current user profile
router.patch("/me", authenticate, validate(updateUserSchema), controller.updateMe);

// Get all users (for team selection)
router.get("/", authenticate, controller.getAllUsers);

// Get user by ID
router.get("/:id", authenticate, controller.getUserById);

module.exports = router;