import { io, Socket } from "socket.io-client";

export const backendUrl = "http://10.0.0.42:8080/";
// export const backendUrl = "https://riddle-rift-dev.azurewebsites.net/";

// event names
export const eventNames = {
  emit: {
    // confirm player
    confirmPlayerRequest: "confirm-player-request",

    createGameRequest: "create-game-request",
    getGameStatusEvent: "get-game-status",
    playerJoinRequest: "player-join-request",
    teamSelectRequest: "team-select-request",
    joinAsAdmin: "join-as-admin",

    // round
    teamReadyRequest: "team-ready-request",
    selectCardsForRound: "select-cards-for-round",
    answerRiddle: "answer-riddle",
    winnerAttack: "winner-attack",

    // restart
    startNewGame: "start-new-game",
  },
  on: {
    gameStatusChange: "game-status-change",
    // confirm player
    confirmPlayerResponse: "confirm-player-response",
    createGameResponse: "create-game-response",
    gameStatus: "game-status",
    playerJoinResponse: "player-join-response",
    teamSelectResponse: "team-select-response",
    joinAsAdminResponse: "join-as-admin-response",

    playerJoinTeam: "player-join-team",
    teamReadyResponse: "team-ready-response",
    roundStageChange: "round_stage_change",

    error: "error",
  },
};

let internalSocket = null;
let listeners = {};

export const inializeSocket = () => {
  try {
    internalSocket = io(backendUrl);
    setupSocket();
    return internalSocket;
  } catch (ex) {
    return null;
  }
};

/**
 * @param {Socket} socket
 * @return {Socket}
 */
export const getSocket = () => {
  if (!internalSocket) {
    return inializeSocket();
  }

  return internalSocket;
};

/**
 * @param {Socket} socket
 */
export const getGameStatus = (gameId) => {
  let socket = getSocket();

  socket.emit(eventNames.emit.getGameStatusEvent, gameId);
};

/**
 * @param {Socket} socket
 */
export const setupSocket = () => {
  let socket = getSocket();
  socket.on("testing", (data) => {
    console.log(data);
  });

  socket.on(eventNames.gameStatus, (data) => {
    console.log("game-status", data);
  });

  socket.onAny((event, ...args) => {
    console.log("connect >>>", event);

    if (listeners[event]) {
      listeners[event].forEach((callback) => callback(...args));
    }
  });
};

export function on(eventType, callback) {
  if (!listeners[eventType]) {
    listeners[eventType] = [];
  }
  listeners[eventType].push(callback);
}
