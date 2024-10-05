import React, { useState } from "react";
import { answerTypes } from "../../../types/riddleTypes";
import Timer from "../../../components/Timer";

function NumberMemoryRiddle({
  riddle,
  riddleSessionStarttime,
  selectedAnswer,
  setSelectedAnswer,
}) {
  let { question } = riddle;
  let colors = question.split(", ");
  console.log("colors >>>", colors, riddleSessionStarttime);

  const [canShowQuestion, setCanShowQuestion] = useState(true);
  const [canShowAnswer, setCanShowAnswer] = useState(false);

  return (
    <div className="w-full flex flex-col gap-[1rem]">
      {canShowQuestion && (
        <Timer
          initialTime={Math.floor(
            (riddleSessionStarttime +
              riddle?.questionAppearTimeLimit * 1000 -
              Date.now()) /
              1000
          )}
          setTimeUp={() => {
            setCanShowAnswer(true);
            setCanShowQuestion(false);
          }}
        />
      )}

      {canShowAnswer && (
        <Timer
          initialTime={Math.floor(
            (riddleSessionStarttime +
              riddle?.questionAppearTimeLimit * 1000 +
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
      {canShowQuestion && (
        <>
          {/* render question */}
          <div className="w-full flex gap-[0.5rem] flex-wrap items-center justify-between bg-white bg-opacity-40 rounded-[0.5rem] px-[1rem] py-[1rem]">
            {question.split(", ").map((c) => (
              <div className="w-[2.5rem] h-[2.5rem] rounded-[0.5rem] shadow-md text-[1.25rem] bg-white flex justify-center items-center">
                <p>{c}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {canShowAnswer &&
        riddle?.answer?.type === answerTypes.MULTIPLE_CHOICE && (
          <div className="w-full flex flex-col gap-[1rem]">
            {riddle?.answer?.options.map((opt) => (
              <div
                key={opt}
                className="w-full flex items-center justify-between bg-white bg-opacity-40 px-[0.5rem] py-[0.5rem] rounded-[0.5rem]"
                onClick={() => setSelectedAnswer(opt)}
              >
                <div
                  className={`w-[1rem] h-[1rem]  border-2 border-black rounded-full ${
                    selectedAnswer === opt ? "bg-primary-blue" : "bg-white"
                  }`}
                ></div>
                {opt?.split(", ").map((c) => (
                  <div className="w-[2rem] h-[2rem] rounded-[0.5rem] shadow-md text-[1rem] bg-white flex justify-center items-center">
                    <p>{c}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
    </div>
  );
}

export default NumberMemoryRiddle;
