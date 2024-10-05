import React, { useEffect, useState } from "react";
import { questionTypes } from "../../../types/riddleTypes";
import ColorMemoryRiddle from "./ColorMemoryRiddle";
import NumberMemoryRiddle from "./NumberMemoryRiddle";
import MathRiddle from "./MathRiddle";

function RenderRiddle({ currentRound, riddle, answer, setAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState(answer);

  useEffect(() => {
    setSelectedAnswer("");
  }, [riddle]);

  useEffect(() => {
    setAnswer(selectedAnswer);
  }, [selectedAnswer]);

  return (
    <div>
      <p>selected: {selectedAnswer}</p>

      {riddle?.type === questionTypes.COLOR_MEMORY_RIDDLE && (
        <ColorMemoryRiddle
          riddle={riddle}
          riddleSessionStarttime={Date.now()}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
        />
      )}

      {riddle?.type === questionTypes.NUMBER_MEMORY_RIDDLE && (
        <NumberMemoryRiddle
          riddle={riddle}
          riddleSessionStarttime={Date.now()}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
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
        />
      )}
    </div>
  );
}

export default RenderRiddle;
