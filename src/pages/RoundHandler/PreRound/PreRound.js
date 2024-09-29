import React, { useEffect, useState } from "react";
import { cards, targetTypes } from "../../../components/cards/cards";
import Loading from "../../../components/Loading";
import Card from "../../../components/Card";
import PrimaryButton from "../../../components/PrimaryButton";
import { eventNames, getSocket } from "../../../socket/socket";
import Modal from "../../../components/Modal";
import SecondaryButton from "../../../components/SecondaryButton";
import SmallCard from "../../../components/SmallCard";

function PreRound({
  // gameData,
  game,
  // updateGameData,
  // goNext,
  // goBack,
  // setShowLoading,
}) {
  const { playerInfo, teams, cards: teamCards } = game;
  const { teamId, name } = playerInfo ?? { teamId: "", name: "", id: "" };
  const team = teams?.[teamId];

  const [loading, setLoading] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // handle targets selection for a card
  const [cardToSelectTarget, setCardToSelectTarget] = useState({});

  const onCardSelectChange = (selected, id, card) => {
    let newList = [];
    if (selected) {
      newList = [...selectedCards, card];
    } else {
      selectedCards.forEach((c) => {
        if (c.id !== id) newList.push(c);
      });
    }
    setSelectedCards([...newList]);
  };

  return (
    <div className="PreRound w-full h-full flex flex-col items-center gap-[1rem] relative">
      <SelectTargetModal
        showModal={showModal}
        teamId={teamId}
        teams={teams}
        setShowModal={setShowModal}
        cardToSelectTarget={cardToSelectTarget}
        setCardToSelectTarget={setCardToSelectTarget}
        selectedCards={selectedCards}
        setSelectedCards={setSelectedCards}
      />

      <p className="text-[1.5rem]">{team?.name}</p>
      <p>Your are the leader, {name}</p>

      <div className="w-full h-max flex justify-between items-center">
        <p className="text-primary-brown">Round {game?.currentRound?.index}</p>
        <p className="text-[0.75rem]">
          Remaining:{" "}
          <span className="text-primary-brown text-[1rem]">
            {teamCards?.cards?.activeCards?.length ?? 0} cards
          </span>
        </p>
      </div>

      {/* render cards */}
      <div className="MainBody w-full h-full overflow-auto flex flex-wrap gap-[0.75rem] justify-center items-center relative">
        {loading ? (
          <Loading />
        ) : (
          <>
            {teamCards?.cards?.activeCards?.length >= 1 ? (
              teamCards?.cards?.activeCards?.map((card) => (
                <Card
                  key={card.id}
                  card={{ ...cards[card.type], id: card.id }}
                  onSelectChange={(selected) => {
                    if (
                      card?.targetType === targetTypes.SINGLE_TARGET ||
                      card?.targetType === targetTypes.MULTIPLE
                    ) {
                      setCardToSelectTarget(card);
                      setShowModal(true);
                    } else {
                      onCardSelectChange(selected, card.id, card);
                    }
                  }}
                  selectedCards={selectedCards}
                />
              ))
            ) : (
              <p>Fight without any card left!</p>
            )}
          </>
        )}
      </div>

      <p className="text-center">
        Selected:{" "}
        <span className="text-primary-brown">
          {selectedCards.length > 0 ? `${selectedCards.length}` : "None"}
        </span>
      </p>

      <div className="w-full flex justify-end items-end">
        <PrimaryButton
          className="bg-primary-green"
          onClick={() => {
            let socket = getSocket();

            socket.emit(
              eventNames.emit.selectCardsForRound,
              {
                teamId,
                selectedCards: selectedCards,
              },
              game.id
            );
          }}
        >
          <p>Ready to Start Round</p>
        </PrimaryButton>
      </div>
    </div>
  );
}

const SelectTargetModal = ({
  showModal,
  setShowModal,
  targetType,
  teamId,
  teams,
  cardToSelectTarget,
  setCardToSelectTarget,
  selectedCards,
  setSelectedCards,
}) => {
  const [targets, setTargets] = useState([]);

  useEffect(() => {
    let card = selectedCards.find((c) => c.id === cardToSelectTarget.id);

    if (card && card.targets) {
      setTargets(card.targets);
    }
  }, [selectedCards]);

  const handleSelectAsTarget = () => {
    let hasCard = selectedCards.some((c) => c.id === cardToSelectTarget.id);
    if (hasCard) {
      let newSelectedCards = selectedCards.map((card) => {
        if (card.id !== cardToSelectTarget.id) {
          return card;
        } else {
          return { ...card, targets: targets };
        }
      });

      setSelectedCards([...newSelectedCards]);
    } else {
      setSelectedCards([...selectedCards, { ...cardToSelectTarget, targets }]);
    }
  };

  const handleUnselect = () => {
    let newSelectedCards = [];
    selectedCards.forEach((c) => {
      if (c.id !== cardToSelectTarget.id) newSelectedCards.push(c);
    });
    setSelectedCards([...newSelectedCards]);
  };

  return (
    <Modal show={showModal} setShow={setShowModal}>
      <div className="w-full h-full flex flex-col justify-center items-center gap-[1rem]">
        <SmallCard
          type={cardToSelectTarget.type}
          text={cardToSelectTarget.description}
        />

        <div className="w-full h-max flex flex-col gap-[0.25rem] justify-center items-center">
          <p>Who do you want to target?</p>
          {cardToSelectTarget?.targetType === targetTypes.SINGLE_TARGET ? (
            <p className="text-[0.75rem]">You can choose 1 target</p>
          ) : (
            <p className="text-[0.75rem]">You can choose multiple targets</p>
          )}
        </div>

        {Object.keys(teams)?.map((tId) => {
          let team = teams[tId];
          return (
            <>
              {team.id !== teamId ? (
                <div
                  className={`w-[6.25rem] h-[6.25rem]  flex items-center justify-center rounded-[0.5rem] cursor-pointer border-2 ${
                    targets.includes(team.id)
                      ? " bg-primary-blue text-white border-white"
                      : "bg-white text-primary-brown border-primary-brown"
                  }`}
                  onClick={() => {
                    setTargets([tId]);
                  }}
                >
                  <p>{team.name}</p>
                </div>
              ) : null}
            </>
          );
        })}

        <div className=" w-full mt-auto flex flex-col justify-center items-center gap-[1rem]">
          <SecondaryButton
            onClick={() => {
              setCardToSelectTarget({});
              setShowModal(false);
            }}
          >
            Cancel
          </SecondaryButton>
          {selectedCards.some((c) => c.id === cardToSelectTarget.id) && (
            <PrimaryButton
              className="bg-primary-red"
              onClick={() => {
                handleUnselect();
                setCardToSelectTarget({});
                setShowModal(false);
              }}
            >
              Don't use card
            </PrimaryButton>
          )}
          {targets.length > 0 && (
            <PrimaryButton
              className="bg-primary-green"
              onClick={() => {
                handleSelectAsTarget();
                setShowModal(false);
              }}
            >
              Select as Target
            </PrimaryButton>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default PreRound;
