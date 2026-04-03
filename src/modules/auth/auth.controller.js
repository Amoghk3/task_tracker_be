const authService = require("./auth.service");

// ===============================
// REGISTER
// ===============================
const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);

    res.status(201).json({
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

// ===============================
// LOGIN
// ===============================
const login = async (req, res) => {
  try {
    const result = await authService.login(req.body);

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// ===============================
// LOGOUT (FIXED)
// ===============================
const logout = async (req, res) => {
  try {
    const result = await authService.logout();

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  register,
  login,
  logout,
};