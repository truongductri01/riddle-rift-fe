import React, { useEffect } from "react";
import PrimaryButton from "../../components/PrimaryButton";
import { eventNames, getSocket, on } from "../../socket/socket";

function GameWaitingRoom({
  gameData,
  updateGameData,
  goNext,
  goBack,
  setShowLoading,
  game,
  setGame,
  setMessage,
}) {
  useEffect(() => {
    on(eventNames.on.teamReadyResponse, () => {
      setShowLoading(false);
    });
  }, []);

  const { playerInfo, teams, currentRound, config } = game;
  const { teamId, name, id } = playerInfo;
  const team = teams[teamId];
  return (
    <div className="GameWaitingRoom w-full h-full flex flex-col justify-start items-center gap-[2rem]">
      <div className="w-full flex flex-col items-center justify-center gap-[0.5rem]">
        <p className=" text-[1.5rem]">{team.name}</p>
        <p>
          {team.leader === id ? "You are the leader" : "You are a team member"},
          {name}
        </p>
      </div>

      <div className="w-full flex flex-col items-center justify-center gap-[1rem]">
        <p>When all teams are ready, the round will starts</p>

        {currentRound.readyTeams && currentRound.readyTeams.includes(teamId) ? (
          <>
            <p>
              {currentRound.readyTeams.length} / {config.teams.length} teams are
              ready
            </p>
            <p>Your team is ready</p>
          </>
        ) : (
          <PrimaryButton
            className="bg-primary-green"
            onClick={() => {
              let socket = getSocket();
              setShowLoading(true);
              socket.emit(eventNames.emit.teamReadyRequest, teamId, game.id);
            }}
          >
            Ready to Start Game
          </PrimaryButton>
        )}
      </div>

      <p className="mt-auto">
        Coming later: When all teams are ready, you will have 30 seconds to pick
        instant effect cards that you want to use for the round
      </p>
    </div>
  );
}

export default GameWaitingRoom;
