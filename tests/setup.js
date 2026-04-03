process.env.DATABASE_URL = "file:test.db";
process.env.JWT_SECRET = "testsecret";
process.env.NODE_ENV = "test";

jest.mock("../src/config/db", () => ({
  user: {    findUnique: jest.fn(),
    create: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
  },
  team: {
    create: jest.fn(),
    findUnique: jest.fn(),
  },
  teamMember: {
    findFirst: jest.fn(),
    create: jest.fn(),
    createMany: jest.fn(),
    findMany: jest.fn(),
  },
  task: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    count: jest.fn(),
  },
  comment: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    delete: jest.fn(),
  },
  attachment: {
    create: jest.fn(),
    findUnique: jest.fn(),
    delete: jest.fn(),
  },
}));