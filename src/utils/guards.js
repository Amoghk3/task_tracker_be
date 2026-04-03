const prisma = require("../config/db");
const AppError = require("./AppError");

/**
 * Verifies that a user is a member of a given team.
 * @param {string} teamId
 * @param {string} userId
 * @returns {Promise<object>} The team member record
 * @throws {AppError} 403 if user is not a team member
 */
const ensureTeamMember = async (teamId, userId) => {
  const member = await prisma.teamMember.findFirst({
    where: { teamId, userId },
  });

  if (!member) {
    throw new AppError("Not authorized — not a team member", 403);
  }

  return member;
};

/**
 * Finds a task by ID or throws 404.
 * @param {string} taskId
 * @returns {Promise<object>} The task record
 * @throws {AppError} 404 if task not found
 */
const ensureTaskExists = async (taskId) => {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  return task;
};

module.exports = { ensureTeamMember, ensureTaskExists };
