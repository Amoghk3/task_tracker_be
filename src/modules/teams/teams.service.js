const prisma = require("../../config/db");

// 🔥 CREATE TEAM
const createTeam = async (data, userId) => {
  return prisma.team.create({
    data: {
      name: data.name,
      description: data.description,
      ownerId: userId,
      members: {
        create: {
          userId,
          role: "owner",
        },
      },
    },
  });
};

// 🔥 GET TEAM (WITH ACCESS CONTROL)
const getTeam = async (teamId, userId) => {
  const member = await prisma.teamMember.findFirst({
    where: { teamId, userId },
  });

  if (!member) throw new Error("Not authorized");

  return prisma.team.findUnique({
    where: { id: teamId },
    include: {
      members: true,
    },
  });
};

// 🔥 ADD MEMBER (OWNER / ADMIN ONLY)
const addMember = async (teamId, userId, role, currentUserId) => {
  const currentUser = await prisma.teamMember.findFirst({
    where: {
      teamId,
      userId: currentUserId,
    },
  });

  if (!currentUser || !["owner", "admin"].includes(currentUser.role)) {
    throw new Error("Not authorized");
  }

  // prevent duplicates
  const existing = await prisma.teamMember.findFirst({
    where: { teamId, userId },
  });

  if (existing) throw new Error("User already in team");

  return prisma.teamMember.create({
    data: {
      teamId,
      userId,
      role: role || "member",
    },
  });
};

module.exports = {
  createTeam,
  getTeam,
  addMember,
};