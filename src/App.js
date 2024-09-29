import { useEffect, useState } from "react";
import "./App.css";
import CreateGame from "./pages/CreateGame/CreateGame";
import LoadingSignal from "./components/LoadingSignal";
import PlayerName from "./pages/PlayerName/PlayerName";
import TeamSelect from "./pages/TeamSelect/TeamSelect";
import {
  eventNames,
  getGameStatus,
  getSocket,
  on,
  setupSocket,
} from "./socket/socket";
import { useLocation } from "react-router-dom";
import GameWaitingRoom from "./pages/GameWaitingRoom/GameWaitingRoom";
import PrimaryButton from "./components/PrimaryButton";
import RoundHandler from "./pages/RoundHandler/RoundHandler";
import FinalWinner from "./pages/FinalWinner/FinalWinner";
import { getGameIdLocal, setGameIdLocal } from "./helpers/gameIdUtils";
import EnterGameId from "./pages/EnterGameId/EnterGameId";
import Modal from "./components/Modal";
import History from "./pages/History/History";

const stages = {
  PLAYER_JOIN: "player_join",
  PLAYER_NAME: "player_name",
  TEAM_SELECT: "team_select",
  WAITING_ROOM: "waiting_room",
  PRE_ROUND: "pre_round",
};

function App() {
  const location = useLocation();
  const [isEndingScene, setIsEndingScene] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [stage, setStage] = useState(stages.PLAYER_JOIN);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [message, setMessage] = useState("");
  const [gameId, setGameId] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  const [game, setGame] = useState();

  useEffect(() => {
    if (localStorage.getItem("stage")) {
      setStage(localStorage.getItem("stage"));
    } else {
      setStage(stages.PLAYER_JOIN);
    }

    setGameId(getGameIdLocal());

    setShowLoading(true);
    let tempoGame = {};
    if (localStorage.getItem("gameData")) {
      tempoGame = JSON.parse(localStorage.getItem("gameData"));
      setGame(tempoGame);
    }

    let newSocket = getSocket();
    setupSocket();

    newSocket.on("connect", () => {
      console.log("socket connected");
      if (getGameIdLocal() && location.pathname !== "/create") {
        newSocket.emit(
          eventNames.emit.confirmPlayerRequest,
          tempoGame.playerId,
          getGameIdLocal()
        );
      }

      setShowLoading(false);
    });

    // game Status
    on(eventNames.on.gameStatus, (gameFromServer) => {
      setGame(gameFromServer);

      if (!gameFromServer.playerInfo || !gameFromServer.playerInfo.teamId) {
        handleGoTo(stages.PLAYER_NAME);
      }

      if (gameFromServer?.finalWinner && location.pathname !== "/create") {
        setIsEndingScene(true);
      }
      setShowLoading(false);
    });

    on(eventNames.on.gameStatusChange, (gameId) => {
      newSocket.emit(eventNames.emit.getGameStatusEvent, gameId);
    });

    // error
    on(eventNames.on.error, (message) => {
      setMessage(message);
      setShowLoading(false);
    });

    // confirm player id
    on(eventNames.on.confirmPlayerResponse, (playerId, gameId) => {
      setGame((prev) => ({ ...prev, playerId, id: gameId }));
      setGameId(gameId);
      setGameIdLocal(gameId);

      newSocket.emit(eventNames.emit.getGameStatusEvent, gameId);

      if (
        localStorage.getItem("stage") &&
        localStorage.getItem("stage") === stages.PLAYER_JOIN
      ) {
        handleGoTo(stages.PLAYER_NAME);
      }
    });

    const handleOnUnmount = () => {
      newSocket.emit("before-disconnect", gameId);
    };
    window.addEventListener("beforeunload", handleOnUnmount);

    return () => {
      window.removeEventListener("beforeunload", handleOnUnmount);
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (game) {
      localStorage.setItem("gameData", JSON.stringify(game));
      setIsGameRunning(true);
    } else {
      localStorage.setItem("gameData", JSON.stringify({}));
    }
  }, [game]);

  useEffect(() => {
    localStorage.setItem("stage", stage);
  }, [stage]);

  useEffect(() => {
    let messageTimer = setTimeout(() => setMessage(""), 2000);

    return () => clearTimeout(messageTimer);
  }, [message]);

  const handleGoTo = (newStage) => {
    setStage(newStage);
  };

  const commonProps = {
    setShowLoading,
    game,
    setGame,
    setMessage,
  };

  return (
    <div className={`App ${isEndingScene ? " ending" : " normal"}`}>
      <LoadingSignal showLoading={showLoading} />

      <div className="fixed bottom-0 left-0 flex items-center gap-[0.5rem]">
        <p
          className="cursor-pointer bg-primary-red text-white px-[0.5rem] py-[0.25rem] rounded-t-[0.5rem]"
          onClick={() => {
            localStorage.clear();
            // localStorage.setItem("stage", stages.PLAYER_JOIN);
            // localStorage.setItem("gameId", "");
            window.location.reload();
          }}
        >
          Reset
        </p>
      </div>

      {location.pathname === "/create" && <CreateGame {...commonProps} />}

      {(!gameId || gameId !== game?.id) &&
        location.pathname !== "/create" &&
        location.pathname !== "/log" && <EnterGameId />}

      {gameId &&
        location.pathname !== "/create" &&
        location.pathname !== "/log" &&
        isGameRunning &&
        !game?.finalWinner && (
          <>
            <p className="fixed top-2 left-2 text-[0.75rem] z-[1]">
              Game Id: {gameId}
            </p>
            <Modal
              className=" w-max"
              show={showHistory}
              setShow={setShowHistory}
            >
              <History game={game} setShowHistory={setShowHistory} />
            </Modal>
            <button
              className="fixed top-2 right-2 cursor-pointer bg-primary-red text-white px-[0.5rem] py-[0.25rem] rounded-[0.5rem]"
              onClick={() => {
                setShowHistory(true);
              }}
            >
              History
            </button>
          </>
        )}

      {/* other routes and stages */}
      {gameId &&
        location.pathname !== "/create" &&
        location.pathname !== "/log" &&
        isGameRunning &&
        (game?.finalWinner ? (
          <FinalWinner {...commonProps} />
        ) : game?.currentRound?.stage && game?.playerInfo?.teamId ? (
          <RoundHandler {...commonProps} />
        ) : (
          <>
            <p>{message}</p>
            {stage === stages.PLAYER_JOIN && (
              <PrimaryButton
                onClick={() => {
                  let socket = getSocket();

                  socket.emit(
                    eventNames.emit.confirmPlayerRequest,
                    game?.playerId,
                    gameId
                  );
                }}
              >
                Join Game
              </PrimaryButton>
            )}
            {stage === stages.PLAYER_NAME && (
              <PlayerName
                {...commonProps}
                goNext={() => handleGoTo(stages.TEAM_SELECT)}
                goBack={() => {}}
              />
            )}
            {stage === stages.TEAM_SELECT && (
              <TeamSelect
                {...commonProps}
                goNext={() => handleGoTo(stages.WAITING_ROOM)}
                goBack={() => handleGoTo(stages.PLAYER_NAME)}
              />
            )}
            {stage === stages.WAITING_ROOM && (
              <GameWaitingRoom
                {...commonProps}
                goNext={() => handleGoTo(stages.PRE_ROUND)}
                goBack={() => handleGoTo(stages.TEAM_SELECT)}
              />
            )}
          </>
        ))}

      {!isGameRunning && (
        <p className="w-full text-center">There is no running game</p>
      )}

      {location.pathname === "/log" && (
        <div className="w-full h-full overflow-auto">
          <pre>{JSON.stringify(game, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
