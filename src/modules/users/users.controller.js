const userService = require("./users.service");

// 🔥 GET CURRENT USER
const getMe = async (req, res) => {
  try {
    const user = await userService.getMe(req.user.userId);

    res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      error: err.message,
    });
  }
};

// 🔥 GET USER BY ID
const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);

    res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      error: err.message,
    });
  }
};

// 🔥 GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    res.json({
      success: true,
      data: users,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// 🔥 UPDATE PROFILE
const updateMe = async (req, res) => {
  try {
    const user = await userService.updateMe(
      req.user.userId,
      req.body
    );

    res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  getMe,
  getUserById,
  getAllUsers,
  updateMe,
};