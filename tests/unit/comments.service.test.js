require("../setup");

const prisma = require("../../src/config/db");
const commentService = require("../../src/modules/comments/comments.service");

describe("Comment Service", () => {
  it("should add comment", async () => {
    prisma.task.findUnique.mockResolvedValue({
      teamId: "team1",
    });

    prisma.teamMember.findFirst.mockResolvedValue(true);

    prisma.comment.create.mockResolvedValue({
      id: "comment1",
    });

    const result = await commentService.addComment(
      "task1",
      "test",
      "user1"
    );

    expect(result.id).toBe("comment1");
  });
});