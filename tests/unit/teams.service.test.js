require("../setup");

const prisma = require("../../src/config/db");
const teamService = require("../../src/modules/teams/teams.service");

describe("Team Service", () => {
  it("should create team", async () => {
    prisma.team.create.mockResolvedValue({
      id: "team1",
      name: "Team",
    });

    const result = await teamService.createTeam(
      { name: "Team" },
      "user1"
    );

    expect(result.name).toBe("Team");
  });

  it("should add member", async () => {
    prisma.teamMember.findFirst
      .mockResolvedValueOnce({ role: "owner" })
      .mockResolvedValueOnce(null);

    prisma.teamMember.create.mockResolvedValue({
      id: "member1",
    });

    const result = await teamService.addMember(
      "team1",
      "user2",
      "member",
      "user1"
    );

    expect(result.id).toBe("member1");
  });
});