require("../setup");

const prisma = require("../../src/config/db");
const attachmentService = require("../../src/modules/attachments/attachments.service");

describe("Attachment Service", () => {
  it("should upload file", async () => {
    prisma.task.findUnique.mockResolvedValue({
      teamId: "team1",
    });

    prisma.teamMember.findFirst.mockResolvedValue(true);

    prisma.attachment.create.mockResolvedValue({
      id: "file1",
    });

    const result = await attachmentService.addAttachment(
      "task1",
      {
        filename: "file.png",
        originalname: "file.png",
        size: 123,
      },
      "user1"
    );

    expect(result.id).toBe("file1");
  });
});