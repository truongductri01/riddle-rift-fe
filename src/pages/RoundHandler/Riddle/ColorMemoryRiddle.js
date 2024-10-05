import React, { useState } from "react";
import { answerTypes } from "../../../types/riddleTypes";
import Timer from "../../../components/Timer";

function ColorMemoryRiddle({
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
          <div className="w-full flex gap-[1rem] flex-wrap items-center justify-center bg-white bg-opacity-40 rounded-[0.5rem] px-[1rem] py-[1rem]">
            {colors.map((c) => (
              <div
                key={c}
                className="w-[2.5rem] h-[2.5rem] rounded-[0.5rem] shadow-md"
                style={{ backgroundColor: c }}
              ></div>
            ))}
          </div>
        </>
      )}

      {canShowAnswer &&
        riddle?.answer?.type === answerTypes.MULTIPLE_CHOICE && (
          <div className="w-full flex flex-col gap-[1rem]">
            {riddle?.answer?.options.map((opt) => (
              <div
                className="w-full flex items-center gap-[1rem] bg-white bg-opacity-40 px-[1rem] py-[1rem] rounded-[0.5rem]"
                onClick={() => setSelectedAnswer(opt)}
              >
                <div
                  className={`w-[1.25rem] h-[1.25rem]  border-2 border-black rounded-full ${
                    selectedAnswer === opt ? "bg-primary-blue" : "bg-white"
                  }`}
                ></div>
                {opt?.split(", ").map((c) => (
                  <div
                    key={c}
                    className="w-[2.5rem] h-[2.5rem] rounded-[0.5rem] shadow-md"
                    style={{ backgroundColor: c }}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        )}
    </div>
  );
}

export default ColorMemoryRiddle;
