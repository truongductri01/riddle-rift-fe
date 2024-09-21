import React, { useState } from "react";
import { cards } from "../../../components/cards/cards";
import Loading from "../../../components/Loading";
import Card from "../../../components/Card";
import PrimaryButton from "../../../components/PrimaryButton";
import { eventNames, getSocket } from "../../../socket/socket";

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
  const [selectedCardIds, setSelectedCardIds] = useState([]);

  console.log("cards >>>", cards);

  const onCardSelectChange = (selected, id) => {
    console.log("change card with id >>>", id, selected);
    let newList = [];
    if (selected) {
      newList = [...selectedCardIds, id];
    } else {
      selectedCardIds.forEach((cardId) => {
        if (cardId !== id) newList.push(cardId);
      });
    }
    setSelectedCardIds([...newList]);
  };
  return (
    <div className="PreRound w-full h-full flex flex-col items-center gap-[1rem] relative">
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
                  onSelectChange={(selected) =>
                    onCardSelectChange(selected, card.id)
                  }
                  selectedCardIds={selectedCardIds}
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
          {selectedCardIds.length > 0 ? `${selectedCardIds.length}` : "None"}
        </span>
      </p>

      <div className="w-full flex justify-end items-end">
        <PrimaryButton
          className="bg-primary-green"
          onClick={() => {
            let socket = getSocket();
            console.log("game to select cards >>>", game);

            socket.emit(
              eventNames.emit.selectCardsForRound,
              {
                teamId,
                selectedCards: selectedCardIds,
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

export default PreRound;
