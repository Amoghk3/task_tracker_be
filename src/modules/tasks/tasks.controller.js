const taskService = require("./tasks.service");

// CREATE
const createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(
      req.body,
      req.user.userId
    );

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// GET
const getTasks = async (req, res) => {
  try {
    const result = await taskService.getTasks(
      req.query,
      req.user.userId
    );

    res.json({
      success: true,
      ...result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// UPDATE
const updateTask = async (req, res) => {
  try {
    await taskService.updateTask(
      req.params.id,
      req.body,
      req.user.userId
    );

    res.json({ success: true });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// DELETE
const deleteTask = async (req, res) => {
  try {
    await taskService.deleteTask(
      req.params.id,
      req.user.userId
    );

    res.json({ success: true });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// 🔥 ASSIGN (CRITICAL FIX APPLIED)
const assignTask = async (req, res) => {
  try {
    const task = await taskService.assignTask(
      req.params.id,
      req.body.assignedTo, // ✅ correct
      req.user.userId      // ✅ correct
    );

    res.json({
      success: true,
      data: task,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  assignTask,
};