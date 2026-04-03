const prisma = require("../../config/db");

// 🔥 reusable helper
const ensureTeamMember = async (teamId, userId) => {
  const member = await prisma.teamMember.findFirst({
    where: { teamId, userId },
  });

  if (!member) throw new Error("Not authorized");

  return member;
};

// 🔥 CREATE TASK
const createTask = async (data, userId) => {
  await ensureTeamMember(data.teamId, userId);

  return prisma.task.create({
    data: {
      ...data,
      createdBy: userId,
    },
  });
};

// 🔥 GET TASKS
const getTasks = async (query, userId) => {
  const {
    status,
    priority,
    search,
    page = 1,
    limit = 10,
  } = query;

  const pageNum = Number(page);
  const limitNum = Number(limit);

  const memberships = await prisma.teamMember.findMany({
    where: { userId },
    select: { teamId: true },
  });

  const teamIds = memberships.map((m) => m.teamId);

  const where = {
    AND: [
      { teamId: { in: teamIds } },
      { status: { not: "archived" } }, // 🔥 important
      status ? { status } : {},
      priority ? { priority } : {},
      search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              { description: { contains: search, mode: "insensitive" } },
            ],
          }
        : {},
    ],
  };

  const tasks = await prisma.task.findMany({
    where,
    skip: (pageNum - 1) * limitNum,
    take: limitNum,
    orderBy: { createdAt: "desc" },
  });

  const total = await prisma.task.count({ where });

  return {
    data: tasks,
    meta: {
      total,
      page: pageNum,
      limit: limitNum,
    },
  };
};

// 🔥 UPDATE TASK
const updateTask = async (taskId, data, userId) => {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!task) throw new Error("Task not found");

  await ensureTeamMember(task.teamId, userId);

  return prisma.task.update({
    where: { id: taskId },
    data,
  });
};

// 🔥 DELETE TASK (SOFT)
const deleteTask = async (taskId, userId) => {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!task) throw new Error("Task not found");

  await ensureTeamMember(task.teamId, userId);

  return prisma.task.update({
    where: { id: taskId },
    data: { status: "archived" },
  });
};

// 🔥 ASSIGN TASK (FIXED)
const assignTask = async (taskId, assignedTo, userId) => {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!task) throw new Error("Task not found");

  await ensureTeamMember(task.teamId, userId);

  const targetUser = await prisma.teamMember.findFirst({
    where: {
      teamId: task.teamId,
      userId: assignedTo,
    },
  });

  if (!targetUser) throw new Error("User not in team");

  return prisma.task.update({
    where: { id: taskId },
    data: { assignedTo },
  });
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  assignTask,
};