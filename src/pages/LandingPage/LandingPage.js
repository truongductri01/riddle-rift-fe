import React, { useState } from "react";
import "./LandingPage.css";
import PrimaryButton from "../../components/PrimaryButton";
import { getScenario } from "../../helpers/gameApis";
import RenderScenario from "./RenderScenario";
import RenderAnswerStage from "./RenderAnswerStage";

const stages = {
  SCENARIO: "SCENARIO",
  ANSWER: "ANSWER",
  RESULT: "RESULT",
};

function LandingPage() {
  const [scenario, setScenario] = useState(null);
  const [yourId, setYourId] = useState(null);
  const [selectedCards, setSelectedCards] = useState([]);
  const [answer, setAnswer] = useState("");

  const [currentStage, setCurrentStage] = useState(stages.SCENARIO);
  console.log("scenario >>>", scenario);
  console.log("yourId >>>", yourId);

  return (
    <div className="LandingPage">
      <div className="LandingPage-Content w-full h-full flex flex-col bg-secondary-brown bg-opacity-85 overflow-auto px-[1rem] py-[1rem]">
        {!scenario && (
          <PrimaryButton
            onClick={async () => {
              let data = await getScenario(1);
              setScenario(data.scenario);
              setYourId(data.yourId);
            }}
            className="h-max"
          >
            Get Scenario
          </PrimaryButton>
        )}

        {scenario && currentStage === stages.SCENARIO ? (
          <RenderScenario
            scenario={scenario}
            yourId={yourId}
            selectedCards={selectedCards}
            setSelectedCards={setSelectedCards}
            onSubmit={() => setCurrentStage(stages.ANSWER)}
          />
        ) : currentStage === stages.ANSWER ? (
          <RenderAnswerStage
            answer={answer}
            setAnswer={setAnswer}
            scenario={scenario}
            yourId={yourId}
            onSubmit={() => setCurrentStage(stages.RESULT)}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
