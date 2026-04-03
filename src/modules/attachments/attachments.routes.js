const express = require("express");
const router = express.Router();

const controller = require("./attachments.controller");
const authenticate = require("../../middleware/authenticate");
const upload = require("../../middleware/upload");

// ===============================
// ATTACHMENT ROUTES (Protected)
// ===============================

// Upload file to a task
router.post("/tasks/:taskId/attachments", authenticate, upload.single("file"), controller.uploadFile);

// Delete attachment (only uploader allowed)
router.delete("/attachments/:id", authenticate, controller.deleteFile);

module.exports = router;