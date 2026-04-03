require("../setup");

const prisma = require("../../src/config/db");
const authService = require("../../src/modules/auth/auth.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("Auth Service", () => {
  it("should register user", async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue("hashed");

    prisma.user.create.mockResolvedValue({
      id: "1",
      email: "test@test.com",
      name: "Test",
    });

    const result = await authService.register({
      name: "Test",
      email: "test@test.com",
      password: "123456",
    });

    expect(result.email).toBe("test@test.com");
  });

  it("should login user", async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: "1",
      email: "test@test.com",
      password: "hashed",
    });

    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("token");

    const result = await authService.login({
      email: "test@test.com",
      password: "123456",
    });

    expect(result.token).toBe("token");
  });
});