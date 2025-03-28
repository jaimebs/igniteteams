import { playersGetByGroup } from "./playersGetByGroup";

export async function playerGetByGroupAndTeam(group: string, team: string) {
  try {
    const storage = await playersGetByGroup(group);

    const players = storage.filter(
      (player) => player.team.toLocaleLowerCase() === team.toLocaleLowerCase()
    );

    return players;
  } catch (error) {
    throw error;
  }
}
