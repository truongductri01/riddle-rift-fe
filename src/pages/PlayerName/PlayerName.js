import React, { useEffect, useState } from "react";
import { eventNames, getSocket, on } from "../../socket/socket";

function PlayerName({
  gameData,
  updateGameData,
  goNext,
  setShowLoading,
  game,
  setGame,
  setMessage,
}) {
  const [playerName, setPlayerName] = useState("");

  useEffect(() => {
    on(eventNames.on.playerJoinResponse, (data) => {
      const { isSuccess, playerName } = data;

      if (isSuccess) {
        setGame((prev) => ({
          ...prev,
          playerInfo: { ...(prev.playerInfo || {}), name: playerName },
        }));
        setMessage("Successfully joined the game");
        goNext();
      } else {
        setMessage("Failed to join the game");
      }

      setShowLoading(false);
    });
  }, []);

  const handleJoinGame = async () => {
    let socket = getSocket();
    setShowLoading(true);

    socket.emit(eventNames.emit.playerJoinRequest, playerName, game.id);
  };

  return (
    <div className="PlayerName w-full h-full flex flex-col items-center justify-center gap-[1rem]">
      <p>What is your name?</p>
      <input
        className=" w-full h-[2.5rem] px-[0.5rem] text-primary-brown border-primary-brown border-[1px] rounded-[0.5rem] text-center"
        placeholder="enter your name ..."
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      {playerName && <JoinGameButton onClick={handleJoinGame} />}
    </div>
  );
}

const JoinGameButton = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex w-max h-max items-center justify-center py-[0.5rem] px-[1.5rem] bg-primary-blue text-white rounded-[0.5rem] border-white border-[1px] cursor-pointer"
    >
      <p>Join Game</p>
    </div>
  );
};

export default PlayerName;
