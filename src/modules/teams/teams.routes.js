const express = require("express");
const router = express.Router();

const controller = require("./teams.controller");
const authenticate = require("../../middleware/authenticate");
const validate = require("../../middleware/validate");
const { createTeamSchema, addMemberSchema } = require("./teams.schema");

// ===============================
// TEAM ROUTES (Protected)
// ===============================

// Create a new team
router.post("/", authenticate, validate(createTeamSchema), controller.createTeam);

// Get team details with members
router.get("/:id", authenticate, controller.getTeam);

// Add a member to team (owner/admin only)
router.post("/:id/members", authenticate, validate(addMemberSchema), controller.addMember);

module.exports = router;