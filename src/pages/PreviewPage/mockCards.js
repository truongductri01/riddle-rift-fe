export const mockCards = {
  cards: {
    teamCardInfo: {
      1732693684703: {
        usedCards: [
          {
            heal: 0,
            activation: "ROUND_END",
            targetType: "COMBINE_WITH_WINNER_ATTACH",
            damage: 1,
            cantExistWith: null,
            counteredBy: "DEFENSE",
            description:
              "Increase your next attack damage (only if you are the winner) by 1. Will be countered by 'DEFENSE' card",
            id: "1732693705843",
            targets: [],
            type: "ATTACK",
          },
          {
            cantExistWith: null,
            damage: 1,
            id: "1732693705828",
            type: "ATTACK",
            targets: [],
            activation: "ROUND_END",
            targetType: "COMBINE_WITH_WINNER_ATTACH",
            description:
              "Increase your next attack damage (only if you are the winner) by 1. Will be countered by 'DEFENSE' card",
            counteredBy: "DEFENSE",
            heal: 0,
          },
        ],
        activeCards: [
          {
            heal: 0,
            type: "DEFENSE",
            damage: 0,
            targetType: "SELF",
            description: "Block one attack against your team",
            activation: "ROUND_END",
            id: "1732693705827",
            counteredBy: null,
            targets: [],
            cantExistWith: null,
          },
          {
            targets: [],
            description: "Increase your team's health point by 1",
            counteredBy: null,
            heal: 1,
            damage: 0,
            type: "HEALING",
            activation: "ROUND_END",
            id: "1732693705845",
            cantExistWith: null,
            targetType: "SELF",
          },
        ],
      },
      1732693684567: {
        usedCards: [
          {
            damage: 0,
            targetType: "SELF",
            type: "HEALING",
            targets: [],
            heal: 1,
            activation: "ROUND_END",
            cantExistWith: null,
            description: "Increase your team's health point by 1",
            counteredBy: null,
            id: "1732693705846",
          },
        ],
        activeCards: [
          {
            damage: 0,
            activation: "ROUND_END",
            cantExistWith: "SWAP_HEALTH",
            description: "Block Swap Health Card from other team",
            type: "BLOCK_SWAP_HEALTH",
            heal: 0,
            id: "1732693705848",
            targets: [],
            targetType: "SELF",
            counteredBy: null,
          },
          {
            description: "Increase your team's health point by 1",
            cantExistWith: null,
            targetType: "SELF",
            type: "HEALING",
            heal: 1,
            damage: 0,
            targets: [],
            counteredBy: null,
            id: "1732693705847",
            activation: "ROUND_END",
          },
          {
            description:
              "Increase your next attack damage (only if you are the winner) by 1. Will be countered by 'DEFENSE' card",
            targets: [],
            counteredBy: "DEFENSE",
            type: "ATTACK",
            cantExistWith: null,
            damage: 1,
            targetType: "COMBINE_WITH_WINNER_ATTACH",
            id: "1732693705838",
            heal: 0,
            activation: "ROUND_END",
          },
          {
            heal: 0,
            counteredBy: null,
            damage: 0,
            targets: [],
            cantExistWith: null,
            targetType: "SELF",
            type: "DEFENSE",
            activation: "ROUND_END",
            id: "1732693705827",
            description: "Block one attack against your team",
          },
          {
            description:
              "Choose another team and swap your team's health with theirs",
            type: "SWAP_HEALTH",
            heal: 0,
            damage: 0,
            activation: "ROUND_END",
            counteredBy: "BLOCK_SWAP_HEALTH",
            targetType: "SINGLE_TARGET",
            id: "1732693705806",
            cantExistWith: "BLOCK_SWAP_HEALTH",
            targets: [],
          },
        ],
      },
    },
    remainingCards: [
      {
        counteredBy: null,
        targetType: "SELF",
        heal: 0,
        targets: [],
        type: "DEFENSE",
        description: "Block one attack against your team",
        id: "1732693705808",
        damage: 0,
        cantExistWith: null,
        activation: "ROUND_END",
      },
    ],
  },
};