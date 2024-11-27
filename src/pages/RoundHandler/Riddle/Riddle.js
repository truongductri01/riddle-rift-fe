import React, { useState } from "react";
import PrimaryButton from "../../../components/PrimaryButton";
import { eventNames, getSocket } from "../../../socket/socket";
import RenderRiddle from "./RenderRiddle";

function Riddle({ game, setGame, setShowLoading, setMessage }) {
  const { currentRound, teams, playerInfo } = game;
  const { teamId } = playerInfo ?? { teamId: "" };

  const [answer, setAnswer] = useState();

  return (
    <div className="Riddle w-full h-full flex flex-col gap-[0.5rem] overflow-auto items-center">
      <div className="w-full flex justify-between">
        <p className="text-[1.5rem]">{teams?.[teamId]?.name}</p>
        <p className="text-[1.5rem] text-primary-brown">
          Round {currentRound.index} result
        </p>
      </div>

      {/* riddle question */}
      {currentRound?.riddle && (
        <div className="w-full h-full flex flex-col mt-[0.5rem] gap-[0.5rem]">
          <RenderRiddle
            currentRound={currentRound}
            riddle={currentRound?.riddle}
            answer={answer}
            setAnswer={setAnswer}
          />

          {!currentRound?.answeredTeams?.includes(teamId) ? (
            <div className="w-full flex justify-end">
              {answer && (
                // && teams[teamId].healthPoint > 0
                <PrimaryButton
                  onClick={() => {
                    let socket = getSocket();

                    socket.emit(
                      eventNames.emit.answerRiddle,
                      {
                        teamId,
                        answer,
                      },
                      game.id
                    );

                    setShowLoading(false);
                  }}
                >
                  Submit your answer
                </PrimaryButton>
              )}

              {/* {teams[teamId].healthPoint <= 0 && (
                <p>Your team has no more life point to answer.</p>
              )} */}
            </div>
          ) : (
            <div className="w-full mt-[0.5rem] flex flex-col items-center gap-[1rem]">
              <p className="font-semibold">Your team has answered</p>
              <p className="text-[0.75rem]">
                Let's see if your opponent can answer the riddle correctly
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Riddle;
