require("../setup");

const prisma = require("../../src/config/db");
const userService = require("../../src/modules/users/users.service");

describe("User Service", () => {
  it("should get user", async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: "1",
      email: "test@test.com",
    });

    const result = await userService.getMe("1");

    expect(result.email).toBe("test@test.com");
  });
});