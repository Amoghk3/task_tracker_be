require("../setup");

const prisma = require("../../src/config/db");
const taskService = require("../../src/modules/tasks/tasks.service");

describe("Task Service", () => {
  it("should create task", async () => {
    prisma.teamMember.findFirst.mockResolvedValue(true);

    prisma.task.create.mockResolvedValue({
      id: "task1",
      title: "Test Task",
    });

    const result = await taskService.createTask(
      { title: "Test Task", teamId: "team1" },
      "user1"
    );

    expect(result.title).toBe("Test Task");
  });

  it("should get tasks", async () => {
    prisma.teamMember.findMany.mockResolvedValue([{ teamId: "team1" }]);

    prisma.task.findMany.mockResolvedValue([]);
    prisma.task.count.mockResolvedValue(0);

    const result = await taskService.getTasks({}, "user1");

    expect(result.data).toEqual([]);
  });
});