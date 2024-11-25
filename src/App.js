import { useEffect, useState } from "react";
import "./App.css";
import CreateGame from "./pages/CreateGame/CreateGame";
import LoadingSignal from "./components/LoadingSignal";
import PlayerName from "./pages/PlayerName/PlayerName";
import TeamSelect from "./pages/TeamSelect/TeamSelect";
import { eventNames, getSocket, on, setupSocket } from "./socket/socket";
import { useLocation, useNavigate } from "react-router-dom";
import GameWaitingRoom from "./pages/GameWaitingRoom/GameWaitingRoom";
import PrimaryButton from "./components/PrimaryButton";
import RoundHandler from "./pages/RoundHandler/RoundHandler";
import { getGameIdLocal, setGameIdLocal } from "./helpers/gameIdUtils";
import EnterGameId from "./pages/EnterGameId/EnterGameId";
import Modal from "./components/Modal";
import History from "./pages/History/History";
import { imgSources } from "./assets/imageSources";
import Toast from "./components/Toast";

const stages = {
  PLAYER_JOIN: "player_join",
  PLAYER_NAME: "player_name",
  TEAM_SELECT: "team_select",
  WAITING_ROOM: "waiting_room",
  PRE_ROUND: "pre_round",
};

function App() {
  const location = useLocation();
  const navigate = useNavigate();
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
      if (getGameIdLocal() && location.pathname === "/join") {
        newSocket.emit(
          eventNames.emit.confirmPlayerRequest,
          tempoGame.playerId,
          getGameIdLocal()
        );
      }

      setShowLoading(false);
    });
    if (newSocket.connected) {
      setShowLoading(false);
    } else {
      newSocket.connect();
    }

    // game Status
    on(eventNames.on.gameStatus, (gameFromServer) => {
      console.log("game from the server >>>", gameFromServer);
      setGame(gameFromServer);

      if (
        !gameFromServer.playerInfo ||
        (!gameFromServer.playerInfo.teamId &&
          !gameFromServer.playerInfo.isAdmin)
      ) {
        handleGoTo(stages.PLAYER_NAME);
      }

      setShowLoading(false);
    });

    on(eventNames.on.gameStatusChange, (gameId) => {
      newSocket.emit(eventNames.emit.getGameStatusEvent, gameId);
    });

    // error
    on(eventNames.on.error, (message) => {
      console.log(message);
      // setMessage(message);
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
    <div className={`App`}>
      <div className="w-full h-full flex flex-col bg-secondary-brown bg-opacity-90 py-[1rem] px-[1rem]">
        <LoadingSignal showLoading={showLoading} />
        {message && <Toast message={message} />}

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

        {/* logo */}
        <div
          className="Logo w-max flex items-center gap-[0.5rem] cursor-pointer mb-[1rem]"
          onClick={() => {
            navigate("/");
            localStorage.clear();
            window.location.reload();
          }}
        >
          <img src={imgSources.LOGO} className="w-[4rem] h-[4rem]"></img>
          <p>Riddle Rift</p>
        </div>

        {location.pathname === "/" && (
          <div className="w-full h-full flex flex-col justify-center items-center gap-[1.25rem]">
            <p>
              Welcome to{" "}
              <span className="text-[1.5rem] text-primary-brown">
                Riddle Rift
              </span>
            </p>
            <div className="w-full h-max flex justify-center items-center gap-[1rem]">
              <PrimaryButton
                className="bg-primary-green"
                onClick={() => {
                  navigate("/create");
                }}
              >
                Create Game
              </PrimaryButton>
              <PrimaryButton
                onClick={() => {
                  navigate("/join");
                }}
              >
                Join Game
              </PrimaryButton>
            </div>
          </div>
        )}

        {location.pathname === "/create" && <CreateGame {...commonProps} />}

        {(!gameId || gameId !== game?.id) && location.pathname === "/join" && (
          <EnterGameId />
        )}

        {gameId && location.pathname === "/join" && isGameRunning && (
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
        {location.pathname === "/join" && (
          <>
            {gameId &&
            isGameRunning &&
            game?.playerInfo &&
            (game?.playerInfo?.teamId || game?.playerInfo?.isAdmin) &&
            ((game?.currentRound?.stage && game?.playerInfo?.teamId) ||
              game?.playerInfo?.isAdmin ||
              game?.finalWinner) ? (
              <RoundHandler {...commonProps} />
            ) : (
              <>
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
                {stage === stages.WAITING_ROOM &&
                  !game?.playerInfo?.isAdmin && (
                    <GameWaitingRoom
                      {...commonProps}
                      goNext={() => handleGoTo(stages.PRE_ROUND)}
                      goBack={() => handleGoTo(stages.TEAM_SELECT)}
                    />
                  )}
              </>
            )}
          </>
        )}

        {location.pathname === "/log" && (
          <div className="w-full h-full overflow-auto">
            <pre>{JSON.stringify(game, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
