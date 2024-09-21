import React from "react";

function ReadyForRiddle({ game }) {
  const { currentRound, teams, playerInfo } = game;
  const { teamId } = playerInfo ?? { teamId: "" };
  return (
    <div className="ReadyForRiddle w-full h-full flex flex-col gap-[1.25rem] overflow-auto items-center">
      <div className="w-full flex justify-between">
        <p className="text-[1.5rem]">{teams?.[teamId]?.name}</p>
        <p className="text-[1.5rem] text-primary-brown">
          Round {currentRound.index} result
        </p>
      </div>

      <p className="text-[1.25rem] text-primary-brown">Your team is ready</p>

      <div className="w-full flex justify-evenly items-center">
        <div>
          <p className="text-[0.75rem]">Ready teams:</p>
          {Object.keys(teams).map((tId) => {
            if (currentRound?.readyTeams?.includes(tId)) {
              return <p>{teams[tId]?.name}</p>;
            } else {
              return null;
            }
          })}
        </div>
        <div>
          <p className="text-[0.75rem]">Missing teams:</p>
          {Object.keys(teams).map((tId) => {
            if (currentRound?.readyTeams?.includes(tId)) {
              return null;
            } else {
              return <p>{teams[tId]?.name}</p>;
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default ReadyForRiddle;
