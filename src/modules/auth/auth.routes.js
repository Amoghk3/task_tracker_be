const express = require("express");
const router = express.Router();

const controller = require("./auth.controller");
const validate = require("../../middleware/validate");
const authenticate = require("../../middleware/authenticate"); // ✅ IMPORTANT

const { registerSchema, loginSchema } = require("./auth.schema");

// ===============================
// AUTH ROUTES
// ===============================

// Register a new user
router.post("/register", validate(registerSchema), controller.register);

// Login user and return JWT token
router.post("/login", validate(loginSchema), controller.login);

// Logout user (requires token)
router.post("/logout", authenticate, controller.logout);

module.exports = router;