import React from "react";
import PrimaryButton from "../../../components/PrimaryButton";
import { eventNames, getSocket } from "../../../socket/socket";
import {
  ActiveAction,
  CounteredAction,
  UselessAction,
} from "../../History/History";

function Result({ game, setGame, setMessage, setShowLoading }) {
  const { currentRound, teams, playerInfo } = game;
  const { teamId } = playerInfo ?? { teamId: "" };

  return (
    <div className="Result w-full h-full flex flex-col gap-[1.25rem] overflow-auto">
      <div className="w-full flex justify-between">
        <p className="text-[1.5rem]">{teams?.[teamId]?.name}</p>
        <p className="text-[1.5rem] text-primary-brown">
          Round {currentRound.index} result
        </p>
      </div>

      {!currentRound?.readyTeams?.includes(teamId) ? (
        <>
          {currentRound?.hasWinner ? (
            <div className="w-full">
              <p className="w-full text-primary-brown flex justify-center gap-[1rem] items-center">
                <span className="text-[1.25rem]">
                  {teams?.[currentRound?.winnerTeamId]?.name}
                </span>
                <span className=" tracking-wide">{" attacked "}</span>
                <span className="text-[1.25rem]">
                  {teams?.[currentRound?.attackedTeamId]?.name}
                </span>
              </p>
            </div>
          ) : (
            <div className="w-full flex flex-col gap-[1rem]">
              <p className="w-full text-primary-brown text-[1.25rem] text-center">
                No winner, no team get attacked
              </p>
            </div>
          )}

          {currentRound?.result && (
            <>
              {Object.keys(teams)
                ?.sort(
                  // team with more health point shows up first
                  (a, b) =>
                    currentRound?.result?.teams?.[b]?.healthPoint -
                    currentRound?.result?.teams?.[a]?.healthPoint
                )
                .map((id) => {
                  let team = teams[id];
                  return (
                    <div className="w-full flex flex-col justify-center items-center gap-[0.75rem] bg-third-brown rounded-[0.5rem] py-[1rem] border-b-2 border-b-primary-brown">
                      <p>
                        {team.name}{" "}
                        {currentRound?.result?.teams?.[team.id] &&
                          `- HP: ${
                            currentRound?.result?.teams?.[team.id]?.healthPoint
                          }`}
                      </p>

                      <div className="w-full flex flex-wrap gap-[0.25rem] items-center justify-center">
                        {currentRound?.result?.activeActions?.map((action) => (
                          <ActiveAction
                            action={action}
                            team={team}
                            teams={teams}
                          />
                        ))}

                        {currentRound?.result?.counteredActions?.map(
                          (action) => (
                            <CounteredAction
                              action={action}
                              team={team}
                              teams={teams}
                            />
                          )
                        )}

                        {currentRound?.result?.uselessActions?.map((action) => (
                          <UselessAction
                            action={action}
                            team={team}
                            teams={teams}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
            </>
          )}

          <PrimaryButton
            className="mt-auto"
            onClick={() => {
              let socket = getSocket();

              socket.emit(eventNames.emit.teamReadyRequest, teamId, game.id);

              setShowLoading(true);
            }}
          >
            Continue
          </PrimaryButton>
        </>
      ) : (
        <>
          <p className="w-full text-center text-primary-brown text-[1.25rem]">
            Waiting to start the next round
          </p>
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
        </>
      )}
    </div>
  );
}

export default Result;
