import React, { useState } from "react";
import RenderRiddle from "../RoundHandler/Riddle/RenderRiddle";
import PrimaryButton from "../../components/PrimaryButton";
import { evalScenario } from "../../helpers/gameApis";

function RenderAnswerStage({ scenario, yourId, onSubmit, answer, setAnswer }) {
  const [willAnswer, setWillAnswer] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleScenarioSubmit = async () => {
    console.log("handle scenario submit >>>", answer);

    const data = await evalScenario(scenario, answer, yourId);
  };

  return (
    <div className="RenderAnswerStage w-full h-full flex flex-col gap-[1rem]">
      {!buttonClicked && (
        <div>
          <p>Do you want to answer the question</p>
          <div className="w-full flex justify-between gap-[1rem] px-[2rem]">
            <PrimaryButton
              onClick={() => {
                setWillAnswer(true);
                setButtonClicked(true);
              }}
            >
              Answer
            </PrimaryButton>
            <PrimaryButton
              onClick={() => {
                setButtonClicked(true);
              }}
            >
              Don't Answer
            </PrimaryButton>
          </div>
        </div>
      )}
      {willAnswer && (
        <RenderRiddle
          currentRound={{}}
          riddle={scenario.riddle}
          answer={answer}
          setAnswer={setAnswer}
          disableTimer
        />
      )}
      {answer && (
        <div className="w-full flex justify-end">
          <PrimaryButton onClick={handleScenarioSubmit}>
            Submit Answer
          </PrimaryButton>
        </div>
      )}
    </div>
  );
}

export default RenderAnswerStage;
