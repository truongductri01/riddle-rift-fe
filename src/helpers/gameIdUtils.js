export const setGameIdLocal = (gameId) => {
  localStorage.setItem("gameId", gameId);
};

export const getGameIdLocal = () => {
  return localStorage.getItem("gameId") ?? "";
};
