import React, { useEffect, useState } from "react";
import { eventNames, getSocket } from "../socket/socket";
import PrimaryButton from "../components/PrimaryButton";
import { defaultGame } from "./testData";
import Card from "../components/Card";

function SocketTest() {
  const [game, setGame] = useState();
  const [isConnected, setIsConnected] = useState({});
  const [selectedCards, setSelectedCards] = useState([]);
  const [answer, setAnswer] = useState("");

  const [message, setMessage] = useState("");

  useEffect(() => {
    let tempoGame = {};
    if (localStorage.getItem("gameData")) {
      tempoGame = JSON.parse(localStorage.getItem("gameData"));
      console.log("teampoGame >>>", tempoGame);
      setGame(tempoGame);
    }
    // setShowLoading(true);
    const newSocket = getSocket();

    newSocket.on("connect", () => {
      setIsConnected(true);
      console.log("connected");

      newSocket.emit(eventNames.emit.confirmPlayerRequest, tempoGame.playerId);
    });

    // error
    newSocket.on(eventNames.on.error, (message) => {
      console.log("error message >>>", message);
    });

    // create game
    newSocket.on(eventNames.on.createGameResponse, (data) => {
      console.log("received from create game >>>", data);
      const { config, teams } = data;

      setGame({ config, teams });
    });

    // confirm player id
    newSocket.on(eventNames.on.confirmPlayerResponse, (playerId) => {
      console.log("playerId >>>", playerId);

      setGame((prev) => ({ ...prev, playerId }));

      newSocket.emit(eventNames.emit.getGameStatusEvent);
    });

    newSocket.on(eventNames.on.gameStatus, (gameFromServer) => {
      console.log("game from game status", gameFromServer);

      setGame(gameFromServer);
      setMessage("Successfully get game status");
    });

    // player join:
    newSocket.on(eventNames.on.playerJoinResponse, (data) => {
      const { isSuccess, playerName } = data;

      if (isSuccess) {
        setGame((prev) => ({
          ...prev,
          playerInfo: { ...(prev.playerInfo || {}), name: playerName },
        }));
        setMessage("Successfully joined the game");
      } else {
        setMessage("Failed to join the game");
      }
    });

    // team select
    newSocket.on(eventNames.on.teamSelectResponse, (teamId) => {
      setGame((prev) => ({
        ...prev,
        playerInfo: { ...prev.playerInfo, teamId },
      }));
      setMessage("successfully join team " + teamId);
    });

    newSocket.on(eventNames.on.playerJoinTeam, (playerInfo) => {
      console.log("new player joined >>>", playerInfo);

      setMessage(`${playerInfo.name} joined the team.`);
    });

    newSocket.on(eventNames.on.teamReadyResponse, (data) => {
      console.log("team ready response data >>>", data);
    });

    newSocket.on(eventNames.on.roundStageChange, () => {
      console.log("round stage change >>>");
    });

    newSocket.on(eventNames.on.gameStatusChange, () => {
      console.log("game status change");
      newSocket.emit(eventNames.emit.getGameStatusEvent);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (game) localStorage.setItem("gameData", JSON.stringify(game));
    else localStorage.setItem("gameData", JSON.stringify({}));
  }, [game]);

  return (
    <div className="Testing w-full h-full">
      <p>Message: {message}</p>

      <p>{isConnected ? "connected" : "not connected"}</p>

      {/* Create game */}
      <div>
        <p>Test create game</p>
        <PrimaryButton
          onClick={() => {
            console.log("test create");
            let socket = getSocket();

            socket.emit(eventNames.emit.createGameRequest, {
              config: defaultGame,
              gameId: "game1",
            });
          }}
        >
          <p>Create game</p>
        </PrimaryButton>
      </div>

      <div>
        <p>Confirm playerId</p>

        <PrimaryButton
          onClick={() => {
            let socket = getSocket();

            socket.emit(eventNames.emit.confirmPlayerRequest, game.playerId);
          }}
        >
          <p>Confirm player id</p>
        </PrimaryButton>
      </div>

      <div>
        <p>Player name entered</p>

        <PrimaryButton
          onClick={() => {
            let socket = getSocket();

            socket.emit(eventNames.emit.playerJoinRequest, "Player name");
          }}
        >
          <p>Player name entered</p>
        </PrimaryButton>
      </div>

      {game &&
        game.playerInfo &&
        !game.playerInfo.teamId &&
        game.config &&
        game.config.teams && (
          <div>
            <p>Player picked team</p>

            {game.config.teams.map((t) => (
              <PrimaryButton
                onClick={() => {
                  let socket = getSocket();
                  socket.emit(eventNames.emit.teamSelectRequest, t.id);
                }}
              >
                <p>{t.name}</p>
              </PrimaryButton>
            ))}
          </div>
        )}

      {game && game.playerInfo && game.playerInfo.teamId && (
        <>
          <p>My team: {game.playerInfo.teamId}</p>
          {game.currentRound &&
            game.currentRound.readyTeams &&
            game.currentRound.readyTeams.includes(game.playerInfo.teamId) && (
              <p>Your team is ready</p>
            )}
        </>
      )}

      <div>
        <p>Ready for Game</p>
        <PrimaryButton
          onClick={() => {
            let socket = getSocket();

            let playerInfo = game.playerInfo;
            let { teamId } = playerInfo;
            socket.emit(eventNames.emit.teamReadyRequest, teamId);
          }}
        >
          <p>My team is Ready</p>
        </PrimaryButton>
      </div>

      {game && game.cards && game.cards.cards.activeCards && (
        <div>
          <div className="w-full flex">
            {game.cards.cards.activeCards.map((c) => (
              <div key={c.id}>
                <p>{c.type}</p>
                <div className="w-full flex"></div>
                <Card
                  onSelectChange={(selected) => {
                    if (selected) setSelectedCards((prev) => [...prev, c.id]);
                    else
                      setSelectedCards((prev) => {
                        if (prev.includes(c.id)) {
                          let index = prev.indexOf(c.id);
                          prev.splice(index, 1);
                        }
                        return [...prev];
                      });
                  }}
                  card={{ ...c, text: "Testing" }}
                  selectedCardIds={[]}
                />
              </div>
            ))}
          </div>
          <p>Selected: {selectedCards.length}</p>
          <pre>{JSON.stringify(selectedCards, null, 2)}</pre>
          <PrimaryButton
            onClick={() => {
              let socket = getSocket();
              console.log("game to select cards >>>", game);
              socket.emit(eventNames.emit.selectCardsForRound, {
                teamId: game.playerInfo.teamId,
                selectedCards,
              });
            }}
          >
            Ready with these cards
          </PrimaryButton>
        </div>
      )}

      {game && game.currentRound && game.currentRound.riddle && (
        <div>
          <p>{game.currentRound.riddle.preQuestion}</p>
          <p>{game.currentRound.riddle.question}</p>
          <input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="What is your answer?"
          />
          <PrimaryButton
            onClick={() => {
              let socket = getSocket();

              socket.emit(eventNames.emit.answerRiddle, {
                teamId: game.playerInfo.teamId,
                answer,
              });
            }}
          >
            Submit answer
          </PrimaryButton>
        </div>
      )}

      {game &&
        game.currentRound &&
        game.currentRound.winnerTeamId &&
        game.playerInfo &&
        game.playerInfo.teamId && (
          <div>
            <p>there is a winner</p>
            {game.currentRound.winnerTeamId === game.playerInfo.teamId ? (
              <div>
                <p>Your team wins</p>
                <p>Choose a team to attack</p>
                {game.config.teams.map((t) => {
                  if (t.id !== game.currentRound.winnerTeamId) {
                    return (
                      <PrimaryButton
                        onClick={() => {
                          let socket = getSocket();

                          socket.emit(eventNames.emit.winnerAttack, t.id);
                        }}
                      >
                        Attack: {t.name}
                      </PrimaryButton>
                    );
                  }
                  return null;
                })}
              </div>
            ) : (
              <p>{game.teams[game.currentRound.winnerTeamId].name} wins</p>
            )}
          </div>
        )}

      <div className="mt-[2rem]">
        {game && game.cards && <pre>{JSON.stringify(game.cards, null, 2)}</pre>}

        <br />
        <hr />
        <br />
        <div>
          <p>Logging info</p>
          <pre>{JSON.stringify(game, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}

export default SocketTest;
