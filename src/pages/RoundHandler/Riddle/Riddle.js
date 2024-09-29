import React, { useEffect, useState } from "react";
import PrimaryButton from "../../../components/PrimaryButton";
import { eventNames, getSocket } from "../../../socket/socket";
import Timer from "../../../components/Timer";

function Riddle({ game, setGame, setShowLoading, setMessage }) {
  const { currentRound, teams, playerInfo } = game;
  const { teamId } = playerInfo ?? { teamId: "" };

  const [answer, setAnswer] = useState();
  const [timeUp, setTimeUp] = useState(false);

  useEffect(() => {
    if (
      currentRound?.riddleSessionStarttime +
        currentRound?.riddleSessionLength * 1000 <
      Date.now()
    ) {
      setTimeUp(true);
    }
  }, [currentRound?.riddleSessionStarttime]);

  return (
    <div className="Riddle w-full h-full flex flex-col gap-[1.25rem] overflow-auto items-center">
      <div className="w-full flex justify-between">
        <p className="text-[1.5rem]">{teams?.[teamId]?.name}</p>
        <p className="text-[1.5rem] text-primary-brown">
          Round {currentRound.index} result
        </p>
      </div>

      {timeUp ? (
        <p>Time is up. Waiting for result</p>
      ) : (
        <Timer
          initialTime={Math.floor(
            (currentRound?.riddleSessionStarttime +
              currentRound?.riddleSessionLength * 1000 -
              Date.now()) /
              1000
          )}
          setTimeUp={setTimeUp}
        />
      )}

      {/* riddle question */}
      {currentRound?.riddle && (
        <div className="w-full h-full flex flex-col mt-[6.25rem] gap-[0.5rem]">
          <p>{currentRound?.riddle?.preQuestion}</p>
          <p className="w-full text-center text-[1.25rem] font-semibold">
            {currentRound?.riddle?.question}
          </p>
          {currentRound?.riddle?.type === "short_answer" && (
            <input
              className=" rounded-[0.5rem] border-2 border-primary-brown py-[0.5rem] px-[0.5rem] focus:outline-none"
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
              placeholder="Enter your answer ..."
            ></input>
          )}

          {!currentRound?.answeredTeams?.includes(teamId) ? (
            <div className="w-full flex justify-end">
              {answer && !timeUp && (
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
                  }}
                >
                  Submit your answer
                </PrimaryButton>
              )}
            </div>
          ) : (
            <div className="w-full mt-[6.25rem] flex flex-col items-center gap-[1rem]">
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
