import React, { useState } from "react";
import { answerTypes } from "../../../types/riddleTypes";
import Timer from "../../../components/Timer";

function MathRiddle({
  riddle,
  riddleSessionStarttime,
  selectedAnswer,
  setSelectedAnswer,
  disableTimer,
}) {
  const [canShowAnswer, setCanShowAnswer] = useState(true);

  return (
    <div className="w-full flex flex-col justify-center items-start gap-[1rem]">
      {canShowAnswer && !disableTimer && (
        <Timer
          initialTime={Math.floor(
            (riddleSessionStarttime +
              riddle?.answerTimeLimit * 1000 -
              Date.now()) /
              1000
          )}
          setTimeUp={() => {
            setCanShowAnswer(false);
            setSelectedAnswer("");
          }}
        />
      )}

      <p>{riddle?.preQuestion}</p>
      <p className="w-full text-center text-[1.25rem] font-semibold">
        {riddle?.question}
      </p>

      {canShowAnswer && riddle?.answer?.type === answerTypes.SHORT_ANSWER && (
        <input
          className=" w-full rounded-[0.5rem] border-2 border-primary-brown py-[0.5rem] px-[0.5rem] focus:outline-none"
          value={selectedAnswer}
          onChange={(e) => {
            setSelectedAnswer(e.target.value);
          }}
          placeholder="Enter your answer ..."
        ></input>
      )}

      {canShowAnswer &&
        riddle?.answer?.type === answerTypes.MULTIPLE_CHOICE && (
          <div className="w-full flex flex-wrap justify-between">
            {riddle?.answer?.options.map((opt) => (
              <div
                className="w-[4rem] flex items-center justify-between bg-white bg-opacity-40 px-[0.5rem] py-[0.5rem] rounded-[0.5rem]"
                onClick={() => setSelectedAnswer(opt)}
              >
                <div
                  className={`w-[1rem] h-[1rem]  border-2 border-black rounded-full ${
                    selectedAnswer === opt ? "bg-primary-blue" : "bg-white"
                  }`}
                ></div>
                <p>{opt}</p>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}

export default MathRiddle;
