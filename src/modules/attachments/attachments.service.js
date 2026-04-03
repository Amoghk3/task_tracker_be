const prisma = require("../../config/db");

// helper
const ensureTeamMember = async (teamId, userId) => {
  const member = await prisma.teamMember.findFirst({
    where: { teamId, userId },
  });

  if (!member) throw new Error("Not authorized");
};

// ADD ATTACHMENT
const addAttachment = async (taskId, file, userId) => {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!task) throw new Error("Task not found");

  await ensureTeamMember(task.teamId, userId);

  return prisma.attachment.create({
    data: {
      taskId,
      userId,
      fileUrl: `/uploads/${file.filename}`,
      fileName: file.originalname,
      fileSize: file.size,
    },
  });
};

// DELETE ATTACHMENT
const deleteAttachment = async (id, userId) => {
  const attachment = await prisma.attachment.findUnique({
    where: { id },
  });

  if (!attachment) throw new Error("Attachment not found");

  if (attachment.userId !== userId) {
    throw new Error("Not authorized");
  }

  return prisma.attachment.delete({
    where: { id },
  });
};

module.exports = {
  addAttachment,
  deleteAttachment,
};