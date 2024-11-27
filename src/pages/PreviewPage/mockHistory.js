export const mockHistory = {
  history: [
    {
      readyTeams: [],
      result: {
        uselessActions: [],
        counteredActions: [],
        teams: {
          1732693684703: {
            id: "1732693684703",
            leader: "ha7U0jn3Xkl7JAyAAAIk",
            healthPoint: 2,
            players: ["ha7U0jn3Xkl7JAyAAAIk"],
            name: "Team 4703",
          },
          1732693684567: {
            healthPoint: -3,
            id: "1732693684567",
            leader: "nzPYWww46MZK5VU9AAIq",
            name: "Team 4567",
            players: ["nzPYWww46MZK5VU9AAIq", "AkdCen_iTt_iOiuvAAIs"],
          },
        },
        activeActions: [
          {
            activator: "1732693684703",
            actionDetail: {
              damage: 5,
              heal: 0,
              counteredBy: "DEFENSE",
            },
            targets: ["1732693684567"],
            actionName: "WinnerAttackAction",
            cards: [
              {
                activation: "ROUND_END",
                damage: 1,
                id: "1732693705843",
                type: "ATTACK",
                counteredBy: "DEFENSE",
                heal: 0,
                cantExistWith: null,
                description:
                  "Increase your next attack damage (only if you are the winner) by 1. Will be countered by 'DEFENSE' card",
                targetType: "COMBINE_WITH_WINNER_ATTACH",
              },
              {
                targetType: "COMBINE_WITH_WINNER_ATTACH",
                counteredBy: "DEFENSE",
                description:
                  "Increase your next attack damage (only if you are the winner) by 1. Will be countered by 'DEFENSE' card",
                cantExistWith: null,
                activation: "ROUND_END",
                type: "ATTACK",
                id: "1732693705828",
                heal: 0,
                damage: 1,
              },
            ],
          },
        ],
        cards: {
          remainingCards: [
            {
              heal: 0,
              id: "1732693705808",
              description: "Block one attack against your team",
              type: "DEFENSE",
              targetType: "SELF",
              counteredBy: null,
              activation: "ROUND_END",
              targets: [],
              cantExistWith: null,
              damage: 0,
            },
          ],
          teamCardInfo: {
            1732693684703: {
              usedCards: [
                {
                  id: "1732693705843",
                  damage: 1,
                  targetType: "COMBINE_WITH_WINNER_ATTACH",
                  heal: 0,
                  activation: "ROUND_END",
                  counteredBy: "DEFENSE",
                  type: "ATTACK",
                  cantExistWith: null,
                  targets: [],
                  description:
                    "Increase your next attack damage (only if you are the winner) by 1. Will be countered by 'DEFENSE' card",
                },
                {
                  activation: "ROUND_END",
                  targetType: "COMBINE_WITH_WINNER_ATTACH",
                  description:
                    "Increase your next attack damage (only if you are the winner) by 1. Will be countered by 'DEFENSE' card",
                  counteredBy: "DEFENSE",
                  damage: 1,
                  id: "1732693705828",
                  cantExistWith: null,
                  heal: 0,
                  targets: [],
                  type: "ATTACK",
                },
              ],
              activeCards: [
                {
                  cantExistWith: "SWAP_HEALTH",
                  heal: 0,
                  id: "1732693705848",
                  targetType: "SELF",
                  damage: 0,
                  counteredBy: null,
                  type: "BLOCK_SWAP_HEALTH",
                  targets: [],
                  description: "Block Swap Health Card from other team",
                  activation: "ROUND_END",
                },
                {
                  description: "Block one attack against your team",
                  id: "1732693705827",
                  targetType: "SELF",
                  counteredBy: null,
                  type: "DEFENSE",
                  activation: "ROUND_END",
                  heal: 0,
                  targets: [],
                  cantExistWith: null,
                  damage: 0,
                },
                {
                  targetType: "SELF",
                  targets: [],
                  heal: 1,
                  damage: 0,
                  type: "HEALING",
                  description: "Increase your team's health point by 1",
                  id: "1732693705845",
                  activation: "ROUND_END",
                  cantExistWith: null,
                  counteredBy: null,
                },
              ],
            },
            1732693684567: {
              usedCards: [],
              activeCards: [
                {
                  description:
                    "Increase your next attack damage (only if you are the winner) by 1. Will be countered by 'DEFENSE' card",
                  activation: "ROUND_END",
                  targetType: "COMBINE_WITH_WINNER_ATTACH",
                  id: "1732693705838",
                  targets: [],
                  type: "ATTACK",
                  counteredBy: "DEFENSE",
                  cantExistWith: null,
                  heal: 0,
                  damage: 1,
                },
                {
                  type: "DEFENSE",
                  heal: 0,
                  id: "1732693705827",
                  damage: 0,
                  description: "Block one attack against your team",
                  activation: "ROUND_END",
                  targetType: "SELF",
                  targets: [],
                  counteredBy: null,
                  cantExistWith: null,
                },
                {
                  type: "HEALING",
                  activation: "ROUND_END",
                  targets: [],
                  id: "1732693705847",
                  description: "Increase your team's health point by 1",
                  damage: 0,
                  cantExistWith: null,
                  heal: 1,
                  counteredBy: null,
                  targetType: "SELF",
                },
                {
                  type: "HEALING",
                  targetType: "SELF",
                  id: "1732693705846",
                  heal: 1,
                  activation: "ROUND_END",
                  damage: 0,
                  cantExistWith: null,
                  targets: [],
                  counteredBy: null,
                  description: "Increase your team's health point by 1",
                },
                {
                  targetType: "SINGLE_TARGET",
                  type: "SWAP_HEALTH",
                  heal: 0,
                  damage: 0,
                  description:
                    "Choose another team and swap your team's health with theirs",
                  counteredBy: "BLOCK_SWAP_HEALTH",
                  activation: "ROUND_END",
                  targets: [],
                  cantExistWith: "BLOCK_SWAP_HEALTH",
                  id: "1732693705806",
                },
              ],
            },
          },
        },
      },
      riddleSessionLength: 30,
      stage: "result",
      teamAnswers: {
        1732693684703: "71",
      },
      riddleSessionStarttime: 1732693764636,
      attackedTeamId: "1732693684567",
      riddle: {
        preQuestion: "What is the value of:",
        questionWillDisappear: false,
        answerTimeLimit: 30,
        questionAppearTimeLimit: 0,
        question: "10 * 7 + 1",
        answer: {
          options: [],
          correctAnswer: 71,
          type: "SHORT_ANSWER",
        },
        type: "NORMAL_MATH_EQUATION",
      },
      instantSessionStarttime: 1732693705996,
      roundActions: [],
      answeredTeams: ["1732693684703"],
      instantSessionLength: 0,
      roundResult: {},
      cardsToUsed: {
        1732693684703: [
          {
            targetType: "COMBINE_WITH_WINNER_ATTACH",
            targets: [],
            cantExistWith: null,
            activation: "ROUND_END",
            type: "ATTACK",
            damage: 1,
            heal: 0,
            description:
              "Increase your next attack damage (only if you are the winner) by 1. Will be countered by 'DEFENSE' card",
            id: "1732693705843",
            counteredBy: "DEFENSE",
          },
          {
            targets: [],
            targetType: "COMBINE_WITH_WINNER_ATTACH",
            description:
              "Increase your next attack damage (only if you are the winner) by 1. Will be countered by 'DEFENSE' card",
            damage: 1,
            cantExistWith: null,
            activation: "ROUND_END",
            type: "ATTACK",
            counteredBy: "DEFENSE",
            heal: 0,
            id: "1732693705828",
          },
        ],
        1732693684567: [],
      },
      index: 1,
      winnerTeamId: "1732693684703",
      hasWinner: true,
    },
    {
      riddle: {
        answerTimeLimit: 30,
        questionWillDisappear: false,
        questionAppearTimeLimit: 0,
        answer: {
          type: "SHORT_ANSWER",
          correctAnswer: 0,
          options: [],
        },
        question: "1 * 7 - 7",
        preQuestion: "What is the value of:",
        type: "NORMAL_MATH_EQUATION",
      },
      result: {
        uselessActions: [],
        counteredActions: [],
        activeActions: [
          {
            activator: "1732693684567",
            cards: [],
            actionName: "WinnerAttackAction",
            actionDetail: {
              damage: 3,
              counteredBy: "DEFENSE",
              heal: 0,
            },
            targets: ["1732693684703"],
          },
          {
            targets: [],
            activator: "1732693684567",
            actionName: "HealingAction",
            cards: [
              {
                type: "HEALING",
                id: "1732693705847",
                cantExistWith: null,
                heal: 1,
                description: "Increase your team's health point by 1",
                counteredBy: null,
                damage: 0,
                activation: "ROUND_END",
                targetType: "SELF",
              },
            ],
            actionDetail: {
              cantExistWith: null,
              description: "Increase your team's health point by 1",
              damage: 0,
              id: "1732693705847",
              targetType: "SELF",
              counteredBy: null,
              type: "HEALING",
              heal: 1,
              activation: "ROUND_END",
            },
          },
          {
            cards: [
              {
                activation: "ROUND_END",
                type: "HEALING",
                damage: 0,
                id: "1732693705846",
                targetType: "SELF",
                counteredBy: null,
                description: "Increase your team's health point by 1",
                cantExistWith: null,
                heal: 1,
              },
            ],
            actionDetail: {
              activation: "ROUND_END",
              type: "HEALING",
              targetType: "SELF",
              heal: 1,
              counteredBy: null,
              description: "Increase your team's health point by 1",
              id: "1732693705846",
              cantExistWith: null,
              damage: 0,
            },
            activator: "1732693684567",
            actionName: "HealingAction",
            targets: [],
          },
        ],
        cards: {
          teamCardInfo: {
            1732693684567: {
              usedCards: [
                {
                  heal: 1,
                  description: "Increase your team's health point by 1",
                  activation: "ROUND_END",
                  counteredBy: null,
                  targetType: "SELF",
                  cantExistWith: null,
                  type: "HEALING",
                  id: "1732693705847",
                  targets: [],
                  damage: 0,
                },
                {
                  cantExistWith: null,
                  damage: 0,
                  heal: 1,
                  targetType: "SELF",
                  type: "HEALING",
                  activation: "ROUND_END",
                  counteredBy: null,
                  description: "Increase your team's health point by 1",
                  id: "1732693705846",
                  targets: [],
                },
              ],
              activeCards: [
                {
                  activation: "ROUND_END",
                  id: "1732693705838",
                  counteredBy: "DEFENSE",
                  targets: [],
                  targetType: "COMBINE_WITH_WINNER_ATTACH",
                  damage: 1,
                  heal: 0,
                  description:
                    "Increase your next attack damage (only if you are the winner) by 1. Will be countered by 'DEFENSE' card",
                  cantExistWith: null,
                  type: "ATTACK",
                },
                {
                  id: "1732693705827",
                  type: "DEFENSE",
                  targetType: "SELF",
                  cantExistWith: null,
                  heal: 0,
                  counteredBy: null,
                  description: "Block one attack against your team",
                  damage: 0,
                  activation: "ROUND_END",
                  targets: [],
                },
                {
                  description:
                    "Choose another team and swap your team's health with theirs",
                  id: "1732693705806",
                  activation: "ROUND_END",
                  counteredBy: "BLOCK_SWAP_HEALTH",
                  cantExistWith: "BLOCK_SWAP_HEALTH",
                  type: "SWAP_HEALTH",
                  heal: 0,
                  targets: [],
                  damage: 0,
                  targetType: "SINGLE_TARGET",
                },
              ],
            },
            1732693684703: {
              usedCards: [
                {
                  activation: "ROUND_END",
                  cantExistWith: null,
                  description:
                    "Increase your next attack damage (only if you are the winner) by 1. Will be countered by 'DEFENSE' card",
                  heal: 0,
                  id: "1732693705843",
                  targets: [],
                  counteredBy: "DEFENSE",
                  targetType: "COMBINE_WITH_WINNER_ATTACH",
                  type: "ATTACK",
                  damage: 1,
                },
                {
                  cantExistWith: null,
                  targetType: "COMBINE_WITH_WINNER_ATTACH",
                  activation: "ROUND_END",
                  damage: 1,
                  id: "1732693705828",
                  heal: 0,
                  targets: [],
                  type: "ATTACK",
                  counteredBy: "DEFENSE",
                  description:
                    "Increase your next attack damage (only if you are the winner) by 1. Will be countered by 'DEFENSE' card",
                },
              ],
              activeCards: [
                {
                  description: "Block Swap Health Card from other team",
                  heal: 0,
                  id: "1732693705848",
                  counteredBy: null,
                  activation: "ROUND_END",
                  targetType: "SELF",
                  targets: [],
                  cantExistWith: "SWAP_HEALTH",
                  type: "BLOCK_SWAP_HEALTH",
                  damage: 0,
                },
                {
                  damage: 0,
                  targetType: "SELF",
                  cantExistWith: null,
                  heal: 0,
                  activation: "ROUND_END",
                  targets: [],
                  type: "DEFENSE",
                  counteredBy: null,
                  id: "1732693705827",
                  description: "Block one attack against your team",
                },
                {
                  type: "HEALING",
                  activation: "ROUND_END",
                  targetType: "SELF",
                  cantExistWith: null,
                  targets: [],
                  heal: 1,
                  description: "Increase your team's health point by 1",
                  damage: 0,
                  id: "1732693705845",
                  counteredBy: null,
                },
              ],
            },
          },
          remainingCards: [
            {
              description: "Block one attack against your team",
              cantExistWith: null,
              type: "DEFENSE",
              heal: 0,
              damage: 0,
              targetType: "SELF",
              activation: "ROUND_END",
              id: "1732693705808",
              counteredBy: null,
              targets: [],
            },
          ],
        },
        teams: {
          1732693684703: {
            id: "1732693684703",
            leader: "ha7U0jn3Xkl7JAyAAAIk",
            healthPoint: -1,
            players: ["ha7U0jn3Xkl7JAyAAAIk"],
            name: "Team 4703",
          },
          1732693684567: {
            leader: "nzPYWww46MZK5VU9AAIq",
            name: "Team 4567",
            players: ["nzPYWww46MZK5VU9AAIq", "AkdCen_iTt_iOiuvAAIs"],
            healthPoint: -1,
            id: "1732693684567",
          },
        },
      },
      readyTeams: [],
      instantSessionStarttime: 1732693777359,
      stage: "result",
      cardsToUsed: {
        1732693684703: [],
        1732693684567: [
          {
            activation: "ROUND_END",
            targetType: "SELF",
            damage: 0,
            id: "1732693705847",
            counteredBy: null,
            cantExistWith: null,
            description: "Increase your team's health point by 1",
            type: "HEALING",
            heal: 1,
            targets: [],
          },
          {
            cantExistWith: null,
            type: "HEALING",
            description: "Increase your team's health point by 1",
            heal: 1,
            targets: [],
            targetType: "SELF",
            activation: "ROUND_END",
            damage: 0,
            id: "1732693705846",
            counteredBy: null,
          },
        ],
      },
      teamAnswers: {
        1732693684567: "0",
      },
      answeredTeams: ["1732693684567"],
      winnerTeamId: "1732693684567",
      attackedTeamId: "1732693684703",
      index: 2,
      instantSessionLength: 0,
      riddleSessionStarttime: 1732693785220,
      hasWinner: true,
      riddleSessionLength: 30,
      roundResult: {},
      roundActions: [],
    },
  ],
};