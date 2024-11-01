import React, { useEffect, useState } from "react";
import { eventNames, getSocket, on } from "../../socket/socket";

function TeamSelect({
  goNext,
  goBack,
  setShowLoading,
  game,
  setGame,
  setMessage,
}) {
  const { playerInfo, config } = game;
  const { teams } = config;
  const { name } = playerInfo;
  const [selectedTeam, setSelectedTeam] = useState({ id: "" });
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    on(eventNames.on.teamSelectResponse, (teamId) => {
      setGame((prev) => ({
        ...prev,
        playerInfo: { ...prev.playerInfo, teamId },
      }));
      setMessage("successfully join team " + teamId);
      setShowLoading(false);
      goNext();
    });
    on(eventNames.on.joinAsAdminResponse, () => {
      setGame((prev) => ({
        ...prev,
        playerInfo: { ...prev.playerInfo, isAdmin: true },
      }));
      setMessage("successfully join as admin");
      setShowLoading(false);
      goNext();
    });
  }, []);

  const handleOnJoinGame = async () => {
    let socket = getSocket();
    setShowLoading(true);
    socket.emit(eventNames.emit.teamSelectRequest, selectedTeam.id, game.id);
  };

  const handleJoinAsAdmin = () => {
    let socket = getSocket();
    setShowLoading(true);
    socket.emit(eventNames.emit.joinAsAdmin, game.id);
  };

  return (
    <div className="TeamSelect w-full h-full flex flex-col items-center justify-start gap-[2rem]">
      {goBack && (
        <p
          className=" cursor-pointer bg-black text-white py-[0.5rem] px-[1.5rem] rounded-[0.5rem]"
          onClick={goBack}
        >
          Back
        </p>
      )}
      <p className="w-full text-right italic">Welcome, {name}</p>
      <p className="text-[1.5rem]">Pick your team</p>

      <div className="w-full h-max flex flex-wrap justify-center gap-[0.5rem]">
        {teams.map((t) => (
          <div
            key={t.id}
            className={` cursor-pointer w-[6.25rem] h-[6.25rem] flex items-center justify-center  border-primary-brown border-[1px] rounded-[0.5rem]
                transition duration-500 ease-in-out
                ${
                  t.id === selectedTeam.id
                    ? " bg-primary-blue text-white"
                    : " bg-white text-black"
                }`}
            onClick={() => {
              setSelectedTeam(t);
              setIsAdmin(false);
            }}
          >
            <p className=" text-[0.75rem]">{t.name}</p>
          </div>
        ))}
        <div
          key="admin"
          className={` cursor-pointer w-[6.25rem] h-[6.25rem] flex items-center justify-center  border-primary-brown border-[1px] rounded-[0.5rem]
                transition duration-500 ease-in-out
                ${
                  isAdmin
                    ? " bg-primary-blue text-white"
                    : " bg-white text-black"
                }`}
          onClick={() => {
            setIsAdmin(true);
            setSelectedTeam({ id: "" });
          }}
        >
          <p className=" text-[0.75rem]">Admin of the game</p>
        </div>
      </div>
      {selectedTeam.id && (
        <JoinGameButton onClick={handleOnJoinGame} title="Join Game" />
      )}
      {isAdmin && (
        <JoinGameButton onClick={handleJoinAsAdmin} title="Join As Admin" />
      )}
    </div>
  );
}

const JoinGameButton = ({ onClick, title }) => {
  return (
    <div
      onClick={onClick}
      className="flex w-max h-max mt-auto items-center justify-center py-[0.5rem] px-[1.5rem] bg-primary-blue text-white rounded-[0.5rem] border-white border-[1px] cursor-pointer"
    >
      <p>{title}</p>
    </div>
  );
};

export default TeamSelect;
