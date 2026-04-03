const jwt = require("jsonwebtoken");
const env = require("../config/env");

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, env.JWT_SECRET);

    req.user = {
      userId: decoded.userId,
    };

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: "Invalid or expired token",
    });
  }
};

module.exports = authenticate;