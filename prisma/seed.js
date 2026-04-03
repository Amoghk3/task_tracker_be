const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  // 🔥 USERS
  const password = await bcrypt.hash("password123", 10);

  const user1 = await prisma.user.create({
    data: {
      name: "Amogh",
      email: "amogh@test.com",
      password,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Rahul",
      email: "rahul@test.com",
      password,
    },
  });

  // 🔥 TEAM
  const team = await prisma.team.create({
    data: {
      name: "Backend Team",
      description: "Core backend developers",
      ownerId: user1.id,
    },
  });

  // 🔥 TEAM MEMBERS
  await prisma.teamMember.createMany({
    data: [
      {
        teamId: team.id,
        userId: user1.id,
        role: "owner",
      },
      {
        teamId: team.id,
        userId: user2.id,
        role: "member",
      },
    ],
  });

  // 🔥 TASK
  const task = await prisma.task.create({
    data: {
      title: "Build API",
      description: "Create all endpoints",
      teamId: team.id,
      createdBy: user1.id,
      assignedTo: user2.id,
      priority: "high",
    },
  });

  // 🔥 COMMENT
  await prisma.comment.create({
    data: {
      body: "Start with auth module",
      taskId: task.id,
      userId: user1.id,
    },
  });

  console.log("✅ Seed data created");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });