const prisma = require("../../config/db");

// 🔥 helper
const ensureTeamMember = async (teamId, userId) => {
  const member = await prisma.teamMember.findFirst({
    where: { teamId, userId },
  });

  if (!member) throw new Error("Not authorized");
};

// ADD COMMENT
const addComment = async (taskId, body, userId) => {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!task) throw new Error("Task not found");

  await ensureTeamMember(task.teamId, userId);

  return prisma.comment.create({
    data: {
      taskId,
      userId,
      body,
    },
  });
};

// GET COMMENTS
const getComments = async (taskId, userId) => {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!task) throw new Error("Task not found");

  await ensureTeamMember(task.teamId, userId);

  return prisma.comment.findMany({
    where: { taskId },
    orderBy: { createdAt: "asc" },
  });
};

// DELETE COMMENT
const deleteComment = async (commentId, userId) => {
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
  });

  if (!comment) throw new Error("Comment not found");

  if (comment.userId !== userId) {
    throw new Error("Not authorized");
  }

  return prisma.comment.delete({
    where: { id: commentId },
  });
};

module.exports = {
  addComment,
  getComments,
  deleteComment,
};