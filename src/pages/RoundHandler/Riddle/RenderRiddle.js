import React, { useEffect, useState } from "react";
import { questionTypes } from "../../../types/riddleTypes";
import ColorMemoryRiddle from "./ColorMemoryRiddle";
import NumberMemoryRiddle from "./NumberMemoryRiddle";
import MathRiddle from "./MathRiddle";
import AdminRiddle from "./AdminRiddle";

function RenderRiddle({
  currentRound,
  riddle,
  answer,
  setAnswer,
  disableTimer,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(answer);

  useEffect(() => {
    setSelectedAnswer("");
  }, [riddle]);

  useEffect(() => {
    setAnswer(selectedAnswer);
  }, [selectedAnswer]);

  return (
    <div>
      {riddle?.type === questionTypes.COLOR_MEMORY_RIDDLE && (
        <ColorMemoryRiddle
          riddle={riddle}
          riddleSessionStarttime={Date.now()}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
          disableTimer={disableTimer}
        />
      )}

      {riddle?.type === questionTypes.NUMBER_MEMORY_RIDDLE && (
        <NumberMemoryRiddle
          riddle={riddle}
          riddleSessionStarttime={Date.now()}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
          disableTimer={disableTimer}
        />
      )}

      {(riddle?.type === questionTypes.NORMAL_MATH_RIDDLE ||
        riddle?.type === questionTypes.TEXT_MATH_RIDDLE) && (
        <MathRiddle
          riddle={riddle}
          riddleSessionStarttime={
            currentRound?.riddleSessionStarttime ?? Date.now()
          }
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
          disableTimer={disableTimer}
        />
      )}

      {riddle?.type === questionTypes.ADMIN && <AdminRiddle riddle={riddle} />}
    </div>
  );
}

export default RenderRiddle;
