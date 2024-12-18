export const mockCurrentRound = {
  currentRound: {
    riddleSessionStarttime: 1732693785220,
    attackedTeamId: "1732693684703",
    riddle: {
      answer: {
        type: "SHORT_ANSWER",
        options: [],
        correctAnswer: 0,
      },
      question: "1 * 7 - 7",
      type: "NORMAL_MATH_EQUATION",
      preQuestion: "What is the value of:",
      questionAppearTimeLimit: 0,
      answerTimeLimit: 30,
      questionWillDisappear: false,
    },
    roundActions: [],
    winnerTeamId: "1732693684567",
    cardsToUsed: {
      1732693684567: [
        {
          counteredBy: null,
          heal: 1,
          targetType: "SELF",
          targets: [],
          activation: "ROUND_END",
          damage: 0,
          type: "HEALING",
          cantExistWith: null,
          description: "Increase your team's health point by 1",
          id: "1732693705847",
        },
        {
          description: "Increase your team's health point by 1",
          targets: [],
          id: "1732693705846",
          type: "HEALING",
          targetType: "SELF",
          counteredBy: null,
          heal: 1,
          damage: 0,
          activation: "ROUND_END",
          cantExistWith: null,
        },
      ],
      1732693684703: [],
    },
    roundResult: {},
    riddleSessionLength: 30,
    readyTeams: [],
    teamAnswers: {
      1732693684567: "0",
    },
    hasWinner: true,
    stage: "result",
    result: {
      activeActions: [
        {
          targets: ["1732693684703"],
          actionDetail: {
            counteredBy: "DEFENSE",
            damage: 3,
            heal: 0,
          },
          activator: "1732693684567",
          cards: [],
          actionName: "WinnerAttackAction",
        },
        {
          actionDetail: {
            targetType: "SELF",
            description: "Increase your team's health point by 1",
            heal: 1,
            cantExistWith: null,
            damage: 0,
            counteredBy: null,
            type: "HEALING",
            id: "1732693705847",
            activation: "ROUND_END",
          },
          actionName: "HealingAction",
          cards: [
            {
              heal: 1,
              activation: "ROUND_END",
              id: "1732693705847",
              type: "HEALING",
              counteredBy: null,
              targetType: "SELF",
              damage: 0,
              cantExistWith: null,
              description: "Increase your team's health point by 1",
            },
          ],
          activator: "1732693684567",
          targets: [],
        },
        {
          activator: "1732693684567",
          actionName: "HealingAction",
          cards: [
            {
              heal: 1,
              damage: 0,
              activation: "ROUND_END",
              description: "Increase your team's health point by 1",
              counteredBy: null,
              targetType: "SELF",
              cantExistWith: null,
              id: "1732693705846",
              type: "HEALING",
            },
          ],
          targets: [],
          actionDetail: {
            id: "1732693705846",
            cantExistWith: null,
            heal: 1,
            activation: "ROUND_END",
            damage: 0,
            type: "HEALING",
            description: "Increase your team's health point by 1",
            counteredBy: null,
            targetType: "SELF",
          },
        },
      ],
      teams: {
        1732693684567: {
          leader: "nzPYWww46MZK5VU9AAIq",
          players: ["nzPYWww46MZK5VU9AAIq", "AkdCen_iTt_iOiuvAAIs"],
          name: "Team 4567",
          id: "1732693684567",
          healthPoint: -1,
        },
        1732693684703: {
          id: "1732693684703",
          healthPoint: -1,
          name: "Team 4703",
          leader: "ha7U0jn3Xkl7JAyAAAIk",
          players: ["ha7U0jn3Xkl7JAyAAAIk"],
        },
      },
      cards: {
        remainingCards: [
          {
            counteredBy: null,
            description: "Block one attack against your team",
            targetType: "SELF",
            targets: [],
            heal: 0,
            type: "DEFENSE",
            cantExistWith: null,
            activation: "ROUND_END",
            id: "1732693705808",
            damage: 0,
          },
        ],
        teamCardInfo: {
          1732693684567: {
            activeCards: [
              {
                targets: [],
                heal: 0,
                type: "ATTACK",
                targetType: "COMBINE_WITH_WINNER_ATTACH",
                id: "1732693705838",
                cantExistWith: null,
                activation: "ROUND_END",
                damage: 1,
                description:
                  "Increase your next attack damage (only if you are the winner) by 1. Will be countered by 'DEFENSE' card",
                counteredBy: "DEFENSE",
              },
              {
                id: "1732693705827",
                counteredBy: null,
                targetType: "SELF",
                targets: [],
                heal: 0,
                activation: "ROUND_END",
                description: "Block one attack against your team",
                damage: 0,
                type: "DEFENSE",
                cantExistWith: null,
              },
              {
                activation: "ROUND_END",
                description:
                  "Choose another team and swap your team's health with theirs",
                targets: [],
                id: "1732693705806",
                targetType: "SINGLE_TARGET",
                heal: 0,
                damage: 0,
                type: "SWAP_HEALTH",
                counteredBy: "BLOCK_SWAP_HEALTH",
                cantExistWith: "BLOCK_SWAP_HEALTH",
              },
            ],
            usedCards: [
              {
                activation: "ROUND_END",
                damage: 0,
                targetType: "SELF",
                counteredBy: null,
                id: "1732693705847",
                targets: [],
                description: "Increase your team's health point by 1",
                cantExistWith: null,
                type: "HEALING",
                heal: 1,
              },
              {
                cantExistWith: null,
                id: "1732693705846",
                targets: [],
                damage: 0,
                targetType: "SELF",
                description: "Increase your team's health point by 1",
                activation: "ROUND_END",
                counteredBy: null,
                type: "HEALING",
                heal: 1,
              },
            ],
          },
          1732693684703: {
            usedCards: [
              {
                heal: 0,
                targets: [],
                description:
                  "Increase your next attack damage (only if you are the winner) by 1. Will be countered by 'DEFENSE' card",
                damage: 1,
                counteredBy: "DEFENSE",
                type: "ATTACK",
                targetType: "COMBINE_WITH_WINNER_ATTACH",
                id: "1732693705843",
                cantExistWith: null,
                activation: "ROUND_END",
              },
              {
                targetType: "COMBINE_WITH_WINNER_ATTACH",
                counteredBy: "DEFENSE",
                heal: 0,
                type: "ATTACK",
                targets: [],
                cantExistWith: null,
                description:
                  "Increase your next attack damage (only if you are the winner) by 1. Will be countered by 'DEFENSE' card",
                activation: "ROUND_END",
                id: "1732693705828",
                damage: 1,
              },
            ],
            activeCards: [
              {
                description: "Block Swap Health Card from other team",
                cantExistWith: "SWAP_HEALTH",
                counteredBy: null,
                heal: 0,
                activation: "ROUND_END",
                id: "1732693705848",
                damage: 0,
                type: "BLOCK_SWAP_HEALTH",
                targets: [],
                targetType: "SELF",
              },
              {
                targets: [],
                activation: "ROUND_END",
                id: "1732693705827",
                type: "DEFENSE",
                counteredBy: null,
                heal: 0,
                damage: 0,
                description: "Block one attack against your team",
                targetType: "SELF",
                cantExistWith: null,
              },
              {
                targets: [],
                type: "HEALING",
                damage: 0,
                heal: 1,
                counteredBy: null,
                id: "1732693705845",
                cantExistWith: null,
                targetType: "SELF",
                activation: "ROUND_END",
                description: "Increase your team's health point by 1",
              },
            ],
          },
        },
      },
      counteredActions: [],
      uselessActions: [],
    },
    index: 2,
    instantSessionStarttime: 1732693777359,
    answeredTeams: ["1732693684567"],
    instantSessionLength: 0,
  },
};
