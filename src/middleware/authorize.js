const prisma = require("../config/db");

const authorize = (roles = []) => {
  return async (req, res, next) => {
    try {
      const teamId = req.params.id || req.body.teamId;

      if (!teamId) {
        return res.status(400).json({
          success: false,
          error: "Team ID required",
        });
      }

      const member = await prisma.teamMember.findFirst({
        where: {
          teamId,
          userId: req.user.userId,
        },
      });

      if (!member) {
        return res.status(403).json({
          success: false,
          error: "Not authorized",
        });
      }

      if (roles.length && !roles.includes(member.role)) {
        return res.status(403).json({
          success: false,
          error: "Insufficient permissions",
        });
      }

      req.teamMember = member;

      next();
    } catch (err) {
      next(err);
    }
  };
};

module.exports = authorize;