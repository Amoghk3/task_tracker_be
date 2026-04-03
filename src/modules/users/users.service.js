const prisma = require("../../config/db");

// 🔥 GET CURRENT USER
const getMe = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  if (!user) throw new Error("User not found");

  return user;
};

// 🔥 GET USER BY ID
const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  if (!user) throw new Error("User not found");

  return user;
};

// 🔥 GET ALL USERS (basic — can add pagination later)
const getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

// 🔥 UPDATE PROFILE (SAFE — controlled fields)
const updateMe = async (userId, data) => {
  return prisma.user.update({
    where: { id: userId },
    data: {
      name: data.name, // only allow safe fields
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
};

module.exports = {
  getMe,
  getUserById,
  getAllUsers,
  updateMe,
};