/**
 * Shared Prisma mock for all unit tests.
 * Variable must be prefixed with 'mock' for Jest's module factory hoisting.
 * Import as: const mockPrisma = require("../helpers/prismaMock");
 */
const mockPrisma = {
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    count: jest.fn(),
  },
  task: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    count: jest.fn(),
    delete: jest.fn(),
  },
  team: {
    create: jest.fn(),
    findUnique: jest.fn(),
  },
  teamMember: {
    create: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
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
  $disconnect: jest.fn(),
};

module.exports = mockPrisma;
