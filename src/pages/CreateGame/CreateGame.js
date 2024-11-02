import React, { useEffect, useState } from "react";
import { colors } from "../../assets/colors";
import DeleteIcon from "../../icons/DeleteIcon";
import ToggleOnIcon from "../../icons/ToggleOnIcon";
import Modal from "../../components/Modal";
import { eventNames, getSocket, on } from "../../socket/socket";
import CardsModalContent from "./CardsModalContent";
import { getGameIdLocal, setGameIdLocal } from "../../helpers/gameIdUtils";
import PrimaryButton from "../../components/PrimaryButton";
import Toggle from "../../components/Toggle";

const maxLimitHealth = 10;
const maxLimitCards = 5;
const maxLimitRounds = 7;

function CreateGame({
  setShowLoading,
  updateGameData,
  goNext,
  goBack,
  gameData,
  game,
  setGame,
}) {
  const [teams, setTeams] = useState([]);
  const [maxHealth, setMaxHealth] = useState(5);
  const [maxCard, setMaxCard] = useState(3);
  const [maxRound, setMaxRound] = useState(5);
  const [showCardsModal, setShowCardsModal] = useState(false);
  const [cardsTotal, setCardsTotal] = useState(0);
  const [cardsAmountConfig, setCardsAmountConfig] = useState({});
  const [gameName, setGameName] = useState("");
  const [error, setError] = useState("");
  const [gameId, setGameId] = useState();

  // this later on can be changed so that it can have more options and more flexible
  const [isRandomQuestionRound, setIsRandomQuestionRound] = useState(true);

  // false means ends when only 1 player has positive life points.
  const [gameEndsWithRounds, setGameEndsWithRounds] = useState(true);

  useState(() => {
    setGameId(getGameIdLocal());

    on(eventNames.on.createGameResponse, (data) => {
      const { config, teams, gameId } = data;

      setGameIdLocal(gameId);
      setGameId(gameId);
      setGame({ config, teams });

      setShowLoading(false);
    });
  }, []);

  useEffect(() => {
    if (typeof maxCard === "number") {
      if (cardsTotal < maxCard * teams.length) {
        setError(`Not enough cards, at least: ${maxCard * teams.length}`);
      } else {
        setError("");
      }
    }
  }, [maxCard, teams, cardsTotal]);

  useEffect(() => {
    if (!maxCard || !maxHealth) {
      setError("Max card and max health should be specified");
    } else if (isNaN(maxCard) || isNaN(maxHealth)) {
      setError("Max card and Max health must be integers");
    } else if (
      Number.parseInt(maxCard) > maxLimitCards ||
      Number.parseInt(maxCard) < 1
    ) {
      setError(`Max card must be between 1 and ${maxLimitCards}`);
    } else if (
      Number.parseInt(maxHealth) > maxLimitHealth ||
      Number.parseInt(maxHealth) < 1
    ) {
      setError(`Max card must be between 1 and ${maxLimitHealth}`);
    } else {
      setMaxCard(Number.parseInt(maxCard));
      setMaxHealth(Number.parseInt(maxHealth));
      setError("");
    }
  }, [maxCard, maxHealth]);

  useEffect(() => {
    if (!maxRound) {
      setError("Max round should be specified");
    } else if (isNaN(maxRound)) {
      setError("Max round must be an integers");
    } else if (
      Number.parseInt(maxRound) > maxLimitRounds ||
      Number.parseInt(maxRound) < 1
    ) {
      setError("Max round must be between 1 and 7");
    } else {
      setMaxRound(Number.parseInt(maxRound));
      setError("");
    }
  }, [maxRound]);

  useEffect(() => {
    setMaxRound(5);
  }, [gameEndsWithRounds]);

  const handleAddTeam = () => {
    let id = Date.now().toString();
    let newTeam = {
      id,
      name: `Team ${id.substring(id.length - 4, id.length)}`,
    };
    setTeams((prev) => [newTeam, ...prev]);
  };
  const handleOnTeamNameChange = (id, newName) => {
    setTeams((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          t.name = newName;
        }
        return { ...t };
      })
    );
  };
  const handleOnTeamRemoved = (id) => {
    let newTeam = [];
    teams.forEach((t) => {
      if (t.id !== id) {
        newTeam.push({ ...t });
      }
    });
    setTeams([...newTeam]);
  };

  const handleOnCreateGame = async () => {
    localStorage.clear();
    let socket = getSocket();
    setShowLoading(true);

    let newGameConfig = {
      maxHealth: Number.parseInt(maxHealth),
      maxCard: Number.parseInt(maxCard),
      maxRound: Number.parseInt(maxRound),
      teams: [...teams],
      cardsAmountConfig,
      gameName,
      gameEndsWithRounds,
      isRandomQuestionRound,
    };

    socket.emit(eventNames.emit.createGameRequest, {
      config: newGameConfig,
    });
  };

  return (
    <div className="CreateGame w-full h-full overflow-auto flex flex-col justify-start items-center gap-[1rem]">
      <Modal show={showCardsModal} setShow={setShowCardsModal}>
        <CardsModalContent
          cardsAmountConfig={cardsAmountConfig}
          setCardsAmountConfig={setCardsAmountConfig}
          cardsTotal={cardsTotal}
          setCardsTotal={setCardsTotal}
          showCardsModal={showCardsModal}
          setShowCardsModal={setShowCardsModal}
          maxCard={maxCard}
          teams={teams}
        />
      </Modal>

      {gameId && (
        <div className="w-full flex flex-col justify-center items-center">
          <p>There is a game created: {gameId}</p>
          <PrimaryButton
            className="text-[0.75rem]"
            onClick={() => {
              navigator.clipboard.writeText(gameId);
              alert("copied game id");
            }}
          >
            Copy game id
          </PrimaryButton>
        </div>
      )}

      <p className=" text-[1.5rem]">Create a new Game</p>

      <div className="w-full flex flex-col">
        <p>Game name:</p>
        <input
          className=" w-full h-[2.5rem] px-[0.5rem] text-primary-brown border-primary-brown border-[1px] rounded-[0.5rem]"
          placeholder="Enter game name ..."
          value={gameName}
          onChange={(e) => {
            setGameName(e.target.value);
          }}
        />
      </div>

      {/* Check if they want to plays with or without rounds */}
      <div className="w-full flex justify-between">
        <div>
          <p>Game ends after some rounds?</p>
          <p className="text-[0.75rem]">
            {gameEndsWithRounds
              ? "Ends after some rounds"
              : "Ends when only one team survived"}
          </p>
        </div>
        <Toggle value={gameEndsWithRounds} setValue={setGameEndsWithRounds} />
      </div>

      {/* Set if the rounds should be question based or admin decision based */}
      <div className="w-full flex justify-between">
        <div>
          <p>Should round come with random question?</p>
          <p className="text-[0.75rem]">
            {isRandomQuestionRound
              ? "The admin will give and evaluate the challenge"
              : "Riddle each round will be generated randomly"}
          </p>
        </div>
        <Toggle
          value={isRandomQuestionRound}
          setValue={setIsRandomQuestionRound}
        />
      </div>

      {/* Important numbers */}
      <div className="w-full flex justify-between">
        <NumberInputFormVertical
          firstPTag="Health per team"
          secondPTag="(max 10)"
          value={maxHealth}
          setValue={setMaxHealth}
        />

        <NumberInputFormVertical
          firstPTag="Cards per team"
          secondPTag="(max 5)"
          value={maxCard}
          setValue={setMaxCard}
        />

        {gameEndsWithRounds && (
          <NumberInputFormVertical
            firstPTag="Number of rounds"
            secondPTag="(max 7)"
            value={maxRound}
            setValue={setMaxRound}
          />
        )}
      </div>

      <div className="w-full flex items-center justify-between">
        <div className="w-max flex flex-col gap-[0.25rem]">
          <p>Cards details</p>
          <p className="text-[0.75rem]">Total: {cardsTotal}</p>
        </div>
        <SettingCardDetailsButton onClick={() => setShowCardsModal(true)} />
      </div>

      <div className="w-full h-full flex flex-col gap-[0.75rem]">
        <div className="w-full h-[2.5rem] flex items-center justify-between z-[1]">
          <p>Teams: {teams.length}</p>
          <AddTeamButton onClick={handleAddTeam} />
        </div>

        <div className=" w-full flex flex-col gap-[0.75rem] transition-all ease-in delay-1000">
          {teams.map((t) => (
            <TeamInfo
              key={t.id}
              team={t}
              handleOnTeamNameChange={handleOnTeamNameChange}
              handleOnTeamRemoved={handleOnTeamRemoved}
            />
          ))}
        </div>
      </div>

      {error && <p className="text-primary-red text-[1.25rem]">{error}</p>}

      <div className="w-full flex justify-center items-end mt-auto sticky bottom-0">
        {teams.length >= 1 && !error && (
          <CreateGameButton onClick={handleOnCreateGame} />
        )}
      </div>
    </div>
  );
}

const TeamInfo = ({ team, handleOnTeamNameChange, handleOnTeamRemoved }) => {
  return (
    <div
      key={team.id}
      className="w-full h-[2.5rem] flex justify-between items-center gap-[0.75rem] slide-in-right"
    >
      <input
        className=" w-full h-full px-[0.5rem] text-primary-brown border-primary-brown border-[1px] rounded-[0.5rem]"
        placeholder="Enter a name ..."
        value={team.name}
        onChange={(e) => handleOnTeamNameChange(team.id, e.target.value)}
      />
      <DeleteIcon
        width={"2.5rem"}
        height={"2.5rem"}
        color={colors["primary-red"]}
        onClick={() => handleOnTeamRemoved(team.id)}
        className="cursor-pointer"
      />
    </div>
  );
};

export const NumberInputForm = ({
  value,
  setValue,
  firstPTag,
  secondPTag,
  placeholder,
  onChange,
}) => {
  return (
    <div className=" w-max flex flex-col justify-between">
      <p>{firstPTag}</p>
      <div className="flex items-center gap-[0.25rem]">
        <input
          className=" w-[5rem] h-[2.5rem] px-[0.5rem] text-primary-brown border-primary-brown border-[1px] rounded-[0.5rem]"
          placeholder={placeholder ?? "max 10"}
          value={value}
          onChange={(e) => {
            setValue && setValue(e.target.value);
            onChange && onChange(e.target.value);
          }}
        />
        <p className="text-[0.75rem]">{secondPTag}</p>
      </div>
    </div>
  );
};

export const NumberInputFormVertical = ({
  value,
  setValue,
  firstPTag,
  secondPTag,
  placeholder,
  onChange,
  className,
}) => {
  return (
    <div className={` w-max flex flex-col justify-between ${className}`}>
      <p>{firstPTag}</p>
      <div className="flex flex-col items-center gap-[0.25rem]">
        <input
          className=" w-[5rem] h-[2.5rem] px-[0.5rem] text-primary-brown border-primary-brown border-[1px] rounded-[0.5rem]"
          placeholder={placeholder ?? "max 10"}
          value={value}
          onChange={(e) => {
            setValue && setValue(e.target.value);
            onChange && onChange(e.target.value);
          }}
        />
        <p className="text-[0.75rem]">{secondPTag}</p>
      </div>
    </div>
  );
};

const AddTeamButton = ({ onClick }) => {
  return (
    <div
      className="w-max h-[2.5rem] rounded-[0.5rem] flex items-center justify-center gap-[0.75rem] border-[1px] cursor-pointer text-white border-white bg-primary-green px-[1.5rem] py-[0.5rem]"
      onClick={onClick}
    >
      <p>Add team</p>
      <p>+</p>
    </div>
  );
};

const CreateGameButton = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex w-max h-max items-center justify-center py-[0.5rem] px-[1.5rem] bg-primary-green text-white rounded-[0.5rem] border-white border-[1px] cursor-pointer"
    >
      <p>Create Game</p>
    </div>
  );
};

const SettingCardDetailsButton = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex w-max h-max items-center justify-center gap-[0.5rem] py-[0.5rem] px-[1.5rem] bg-primary-blue text-white rounded-[0.5rem] border-white border-[1px] cursor-pointer"
    >
      <p>Setting</p>
      <ToggleOnIcon width="1.5rem" height="1.5rem" color="white" />
    </div>
  );
};

export default CreateGame;
