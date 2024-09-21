import { imgSources } from "../../assets/imageSources";

// these should be used for backend actually
export const cardTypes = {
  ATTACK: "Attack",
  DEFENSE: "Defense",
  HEALING: "Healing",
};

export const cards = {
  [cardTypes.ATTACK]: {
    // this will be combine with the attack to be counted as 1 action
    text: "Increase your next attack damage by 1",
    activateOnAttack: true, // only effective if on attack
    damage: 1,
    heal: 0,
    counter: null,
    img: imgSources.SWORD,
    countered: cardTypes.DEFENSE,
    type: cardTypes.ATTACK,
  },
  [cardTypes.DEFENSE]: {
    text: "Block one next attack against your team",
    activateOnAttack: false, // only effective if on attack
    damage: 0,
    heal: 0,
    img: imgSources.SHIELD,
    countered: null,
    type: cardTypes.DEFENSE,
  },
  [cardTypes.HEALING]: {
    text: "Increase your team's health point by 1",
    activateOnAttack: false, // only effective if on attack
    damage: 0,
    heal: 1,
    img: imgSources.POTION,
    countered: null,
    type: cardTypes.HEALING,
  },
};

export const allowCards = Object.keys(cards).map((key) => cards[key]);

export const getDefaultCardsSetting = () => {
  let defaultSettings = {};
  for (let key in cards) {
    defaultSettings[key] = 5;
  }
  return defaultSettings;
};

// type for now is: attack, defense, or heal
// data should be: {type: count}
export const generateCard = async (data) => {
  let result = [];

  for (let type in data) {
    console.log(type);
    let count = data[type];
    for (let i = 0; i < count; i++) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      result.push({ ...cards[type], id: Date.now().toString() });
    }
  }
  console.log(result);

  return result;
};

export const testingCards = [
  {
    activateOnAttack: true,
    counter: null,
    damage: 1,
    heal: 0,
    id: "1725009038822",
    img: "/static/media/sword.1e4897f24b76823650c1.jpg",
    text: "Increase your next attack damage by 1",
    type: "Attack",
  },
  {
    activateOnAttack: true,
    counter: null,
    damage: 1,
    heal: 0,
    id: "1725009039822",
    img: "/static/media/sword.1e4897f24b76823650c1.jpg",
    text: "Increase your next attack damage by 1",
    type: "Attack",
  },
  {
    activateOnAttack: false,
    counter: null,
    damage: 0,
    heal: 1,
    id: "1725009040822",
    img: "/static/media/potion.a9dc1e08cf76ded4e4f0.jpg",
    text: "Increase your team's health point by 1",
    type: "Healing",
  },
  {
    activateOnAttack: false,
    counter: null,
    damage: 0,
    heal: 1,
    id: "1725009041822",
    img: "/static/media/potion.a9dc1e08cf76ded4e4f0.jpg",
    text: "Increase your team's health point by 1",
    type: "Healing",
  },
  {
    activateOnAttack: false,
    counter: "Attack",
    damage: 0,
    heal: 0,
    id: "1725009042823",
    img: "/static/media/shield.8ff1b231c2238b601740.jpg",
    text: "Block one next attack against your team",
    type: "Defense",
  },
];
