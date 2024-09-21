import React from "react";
import GameWaitingRoom from "../GameWaitingRoom/GameWaitingRoom";
import PreRound from "./PreRound/PreRound";
import WinnerDecision from "./WinnerDecision/WinnerDecision";
import Result from "./Result/Result";
import Riddle from "./Riddle/Riddle";
import ReadyForRiddle from "./ReadyForRiddle/ReadyForRiddle";

const roundStages = {
  READY: "ready",
  GENERATE_CARDS: "generate_cards",
  INSTANT_CARD_SESSION: "instant_card_session",
  SELECT_USE_CARDS: "select_use_cards",
  READY_FOR_RIDDLE: "ready_for_riddle",
  RIDDLE: "riddle",
  WINNER_DECISION: "winner_decision",
  CALCULATE_RESULT: "calculate_result",
  RESULT: "result",
};

function RoundHandler({ setShowLoading, game, setGame, setMessage }) {
  const { currentRound, playerInfo } = game;
  const { teamId } = playerInfo ?? { teamId: "" };

  let commonProps = {
    setShowLoading,
    game,
    setGame,
    setMessage,
  };
  return (
    // <div className="RoundHandler w-full h-full">
    <>
      {/* Handle all pages of the round here */}
      {currentRound.stage === roundStages.READY && (
        <GameWaitingRoom {...commonProps} />
      )}

      {currentRound.stage === roundStages.INSTANT_CARD_SESSION && (
        <p>Generating cards for the game ...</p>
      )}
      {currentRound.stage === roundStages.SELECT_USE_CARDS && (
        <PreRound {...commonProps} />
      )}
      {currentRound.stage === roundStages.READY_FOR_RIDDLE &&
        !currentRound?.readyTeams?.includes(teamId) && (
          <PreRound {...commonProps} />
        )}

      {currentRound.stage === roundStages.READY_FOR_RIDDLE &&
        currentRound?.readyTeams?.includes(teamId) && (
          <ReadyForRiddle {...commonProps} />
        )}
      {currentRound.stage === roundStages.RIDDLE && <Riddle {...commonProps} />}
      {currentRound.stage === roundStages.WINNER_DECISION && (
        <WinnerDecision {...commonProps} />
      )}
      {currentRound.stage === roundStages.RESULT && <Result {...commonProps} />}
    </>
  );
}

export default RoundHandler;
