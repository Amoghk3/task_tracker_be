const teamService = require("./teams.service");

// CREATE TEAM
const createTeam = async (req, res) => {
  try {
    const team = await teamService.createTeam(
      req.body,
      req.user.userId
    );

    res.status(201).json({
      success: true,
      data: team,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// GET TEAM
const getTeam = async (req, res) => {
  try {
    const team = await teamService.getTeam(
      req.params.id,
      req.user.userId
    );

    res.json({
      success: true,
      data: team,
    });
  } catch (err) {
    res.status(403).json({
      success: false,
      error: err.message,
    });
  }
};

// ADD MEMBER
const addMember = async (req, res) => {
  try {
    const member = await teamService.addMember(
      req.params.id,
      req.body.userId,
      req.body.role,
      req.user.userId
    );

    res.json({
      success: true,
      data: member,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  createTeam,
  getTeam,
  addMember,
};