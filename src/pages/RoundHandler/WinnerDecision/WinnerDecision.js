import React, { useState } from "react";
import PrimaryButton from "../../../components/PrimaryButton";
import { eventNames, getSocket } from "../../../socket/socket";

function WinnerDecision({ game, setGame, setMessage, setShowLoading }) {
  const { playerInfo, teams, config, currentRound } = game;
  const { name, teamId, id } = playerInfo ?? { id: "", name: "", teamId: "" };
  const { index, hasWinner, winnerTeamId } = currentRound ?? {
    index: 0,
    hasWinner: false,
    winnerTeamId: "",
  };

  const [teamIdToAttack, setTeamIdToAttack] = useState("");

  return (
    <div className="WinnerDecision w-full h-full flex flex-col items-center gap-[2.5rem]">
      <div className="w-full flex justify-between items-center">
        <p className="text-[1.5rem]">{teams?.[teamId]?.name}</p>
        <p className="text-[1.5rem] text-primary-brown">Round {index}</p>
      </div>
      {hasWinner ? (
        winnerTeamId === teamId ? (
          <div className="w-full h-full flex flex-col items-center gap-[1.25rem]">
            <p className="text-[1.5rem] bg-primary-green w-full text-center text-white py-[0.5rem] px-[1.5rem] rounded-[0.5rem] border-white border-2">
              Your team is the winner
            </p>
            <p>Choose the team to attack</p>
            <div>
              {config?.teams?.map((t) => (
                <>
                  {t.id !== teamId ? (
                    <div
                      className={`w-[6.25rem] h-[6.25rem]  flex items-center justify-center rounded-[0.5rem] cursor-pointer border-2 ${
                        t.id === teamIdToAttack
                          ? " bg-primary-blue text-white border-white"
                          : "bg-white text-primary-brown border-primary-brown"
                      }`}
                      onClick={() => {
                        setTeamIdToAttack(t.id);
                      }}
                    >
                      <p>{t.name}</p>
                    </div>
                  ) : null}
                </>
              ))}
            </div>
            <div className="w-full mt-auto flex justify-end">
              {teamIdToAttack && (
                <PrimaryButton
                  className="bg-primary-red w-min"
                  onClick={() => {
                    let socket = getSocket();

                    socket.emit(
                      eventNames.emit.winnerAttack,
                      teamIdToAttack,
                      game.id
                    );

                    setShowLoading(true);
                  }}
                >
                  Attack
                </PrimaryButton>
              )}
            </div>
          </div>
        ) : (
          <p>{teams?.[winnerTeamId]?.name} is the winner</p>
        )
      ) : (
        <p>There is no winner</p>
      )}
    </div>
  );
}

export default WinnerDecision;
