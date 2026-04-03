const mockPrisma = require("../helpers/prismaMock");
jest.mock("../../src/config/db", () => mockPrisma);

const request = require("supertest");
const app = require("../../src/app");

describe("Auth API — Integration", () => {
  beforeEach(() => jest.clearAllMocks());

  describe("POST /api/auth/register", () => {
    it("should return 201 on valid registration", async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null); // no duplicate
      mockPrisma.user.create.mockResolvedValue({
        id: "1",
        name: "Test",
        email: "test@test.com",
        createdAt: new Date(),
      });

      const res = await request(app)
        .post("/api/auth/register")
        .send({
          name: "Test",
          email: "test@test.com",
          password: "123456",
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.email).toBe("test@test.com");
      expect(res.body.data.password).toBeUndefined();
    });

    it("should return 400 on invalid body (missing name)", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({
          email: "test@test.com",
          password: "123456",
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it("should return 400 on short password", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({
          name: "Test",
          email: "test@test.com",
          password: "12",
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it("should return 400 on invalid email", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({
          name: "Test",
          email: "not-an-email",
          password: "123456",
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe("POST /api/auth/login", () => {
    it("should return 400 on invalid body (missing password)", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          email: "test@test.com",
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe("Health check", () => {
    it("should return 200 on /", async () => {
      const res = await request(app).get("/");

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toContain("API Running");
    });
  });
});