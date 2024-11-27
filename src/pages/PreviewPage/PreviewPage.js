import React, { useState } from "react";
import { mockGame } from "./mockGame";
import WelcomePage from "../WelcomePage/WelcomePage";
import StartingScreen from "../StartingScreen/StartingScreen";
import CreateGame from "../CreateGame/CreateGame";
import EnterGameId from "../EnterGameId/EnterGameId";
import Modal from "../../components/Modal";
import History from "../History/History";
import PlayerName from "../PlayerName/PlayerName";
import TeamSelect from "../TeamSelect/TeamSelect";
import GameWaitingRoom from "../GameWaitingRoom/GameWaitingRoom";
import ReadyForRiddle from "../RoundHandler/ReadyForRiddle/ReadyForRiddle";
import PreRound from "../RoundHandler/PreRound/PreRound";
import Riddle from "../RoundHandler/Riddle/Riddle";
import WinnerDecision from "../RoundHandler/WinnerDecision/WinnerDecision";
import Result from "../RoundHandler/Result/Result";
import FinalWinner from "../FinalWinner/FinalWinner";

const pageIds = {
  LANDING: "LANDING",
  START: "START",
  CREATE: "CREATE",
  JOIN: "JOIN",
  PLAYER_NAME: "PLAYER_NAME",
  TEAM_SELECT: "TEAM_SELECT",
  TEAM_READY: "TEAM_READY",
  CARDS_SELECT: "CARDS_SELECT",
  ROUND_READY: "ROUND_READY",
  RIDDLE: "RIDDLE",
  WINNER_DECISION: "WINNER_DECISION",
  ROUND_RESULT: "ROUND_RESULT",
  FINAL_RESULT: "FINAL_RESULT",
  YOUTUBE_PREVIEW: "YOUTUBE_PREVIEW",
};
console.log("Mock Game >>>", mockGame);

function PreviewPage() {
  const [selectedPage, setSelectedPage] = useState(pageIds.LANDING);
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="App">
      <div
        className="w-full h-full flex flex-col bg-secondary-brown bg-opacity-90 
        py-[0.5rem] px-[1rem] xl:py-[2rem] xl:px-[30rem] lg:py-[2rem] lg:px-[15rem] md:py-[2rem] md:px-[8rem]"
      >
        <Dropdown setSelectedPage={setSelectedPage} />
        {selectedPage === pageIds.LANDING && <WelcomePage />}
        {selectedPage === pageIds.START && <StartingScreen />}
        {selectedPage === pageIds.CREATE && <CreateGame />}
        {selectedPage === pageIds.JOIN && <EnterGameId />}
        {selectedPage === pageIds.PLAYER_NAME && <PlayerName />}
        {selectedPage === pageIds.TEAM_SELECT && <TeamSelect game={mockGame} />}
        {selectedPage === pageIds.TEAM_READY && (
          <GameWaitingRoom game={mockGame} />
        )}
        {selectedPage === pageIds.CARDS_SELECT && (
          <PreRound
            game={{
              ...mockGame,
              cards: {
                cards: {
                  ...mockGame.cards.teamCardInfo[mockGame.playerInfo.teamId],
                },
              },
            }}
          />
        )}
        {selectedPage === pageIds.ROUND_READY && (
          <ReadyForRiddle game={mockGame} />
        )}
        {selectedPage === pageIds.RIDDLE && <Riddle game={mockGame} />}
        {selectedPage === pageIds.WINNER_DECISION && (
          <WinnerDecision game={mockGame} />
        )}
        {selectedPage === pageIds.ROUND_RESULT && <Result game={mockGame} />}
        {selectedPage === pageIds.FINAL_RESULT && (
          <FinalWinner game={mockGame} />
        )}
        {selectedPage === pageIds.YOUTUBE_PREVIEW && (
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/p8XAHa_I3Ro?si=93_R5L2hRINwYNWa"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}
      </div>

      <Modal className=" w-max" show={showHistory} setShow={setShowHistory}>
        <History game={mockGame} setShowHistory={setShowHistory} />
      </Modal>
      <button
        className="fixed top-2 right-2 cursor-pointer bg-primary-red text-white px-[0.5rem] py-[0.25rem] rounded-[0.5rem]"
        onClick={() => {
          setShowHistory(true);
        }}
      >
        History
      </button>
      <div className="fixed bottom-0 left-0 flex items-center gap-[0.5rem]">
        <p
          className="cursor-pointer bg-primary-red text-white px-[0.5rem] py-[0.25rem] rounded-t-[0.5rem]"
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          Reset
        </p>
      </div>
    </div>
  );
}

const Dropdown = ({ setSelectedPage }) => {
  const [showDropdown, setShowDropdown] = useState();
  return (
    <div>
      <button
        id="dropdownHoverButton"
        data-dropdown-toggle="dropdownHover"
        className="relative z-10 text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        Dropdown hover{" "}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {showDropdown && (
        <div
          id="dropdownHover"
          className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownHoverButton"
          >
            {Object.keys(pageIds).map((key) => (
              <li
                key={key}
                onClick={() => {
                  setSelectedPage(key);
                  setShowDropdown(false);
                }}
              >
                <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  {key}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PreviewPage;
