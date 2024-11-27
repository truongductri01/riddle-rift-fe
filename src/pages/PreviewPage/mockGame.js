import { mockCards } from "./mockCards";
import { mockCurrentRound } from "./mockCurrentRound";
import { mockHistory } from "./mockHistory";
import { mockPlayers } from "./mockPlayers";

export const mockGame = {
  ...mockCurrentRound,
  ...mockHistory,
  ...mockCards,
  ...mockPlayers,
  id: "T3hBMNGgzyLAL9PCCNU1",
  state: "running",
  teams: {
    1732693684703: {
      players: ["ha7U0jn3Xkl7JAyAAAIk"],
      leader: "ha7U0jn3Xkl7JAyAAAIk",
      healthPoint: -1,
      name: "Team 4703",
      id: "1732693684703",
    },
    1732693684567: {
      name: "Team 4567",
      players: [
        "nzPYWww46MZK5VU9AAIq",
        "AkdCen_iTt_iOiuvAAIs",
        "L-TRfgn4d52yagbhAAI2",
      ],
      healthPoint: -1,
      id: "1732693684567",
      leader: "nzPYWww46MZK5VU9AAIq",
    },
  },
  config: {
    isRandomQuestionRound: true,
    teams: [
      {
        id: "1732693684703",
        name: "Team 4703",
      },
      {
        id: "1732693684567",
        name: "Team 4567",
      },
    ],
    maxHealth: 2,
    maxRound: 3,
    cardsAmountConfig: {
      SWAP_HEALTH: 1,
      BLOCK_SWAP_HEALTH: 1,
      ATTACK: 3,
      HEALING: 3,
      DEFENSE: 3,
    },
    gameEndsWithRounds: true,
    maxCard: 5,
    gameName: "",
  },
  playerInfo: {
    id: "",
    teamId: "1732693684567",
    name: "Troy",
  },
};
