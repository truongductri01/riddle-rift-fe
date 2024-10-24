import React from "react";
import SmallCard from "../../components/SmallCard";
import { cards } from "../../components/cards/cards";
import Card from "../../components/Card";
import PrimaryButton from "../../components/PrimaryButton";

function RenderScenario({
  scenario,
  yourId,
  selectedCards,
  setSelectedCards,
  onSubmit,
}) {
  return (
    <div className="RenderScenario w-full h-full flex flex-col justify-center items-center gap-[1rem]">
      {/* render current round */}
      <p>Here is the current state of the game</p>

      <div className="w-full flex justify-center gap-[1rem]">
        {scenario?.teams &&
          Object.keys(scenario?.teams)
            .sort(
              (a, b) =>
                scenario?.teams[b].healthPoint - scenario?.teams[a].healthPoint
            )
            .map((teamId, index) => (
              <div
                key={teamId}
                className={`w-max px-[0.75rem] rounded-md text-white ${
                  index === 0 ? "bg-primary-green" : "bg-primary-blue"
                }`}
              >
                <p>
                  {scenario?.teams[teamId].name}:{" "}
                  {scenario?.teams[teamId].healthPoint}
                </p>
              </div>
            ))}
      </div>

      {/* render cards */}
      {scenario?.currentRound &&
        scenario?.currentRound.cardsToUsed &&
        Object.keys(scenario?.currentRound.cardsToUsed)
          .sort(
            (a, b) =>
              scenario?.teams[b].healthPoint - scenario?.teams[a].healthPoint
          )
          .map((teamId) => (
            <div
              key={`${teamId}_card`}
              className="w-full bg-white bg-opacity-60 px-[0.5rem] py-[0.5rem]"
            >
              <p>{scenario?.teams[teamId].name} will use</p>
              <div className="w-full flex justify-center items-center gap-[0.5rem] flex-wrap">
                {scenario?.currentRound.cardsToUsed[teamId].map((c) => (
                  <SmallCard
                    text={cards[c.type].text}
                    type={c.type}
                    key={c.id}
                  />
                ))}
              </div>
            </div>
          ))}

      <div className="w-full flex flex-col gap-[0.5rem]">
        <p>
          You have to pick your card and decide whether you want to answer the
          riddle or not
        </p>
        <div className="w-full flex justify-center gap-[0.5rem]">
          {scenario?.cards?.teamCardInfo?.[yourId]?.activeCards &&
            scenario?.cards?.teamCardInfo?.[yourId]?.activeCards.map((card) => (
              <Card
                card={{ ...card, text: card.description }}
                onSelectChange={(selected) => {
                  let newList = [];
                  if (selected) {
                    newList = [...selectedCards, card];
                  } else {
                    selectedCards.forEach((c) => {
                      if (c.id !== card.id) newList.push(c);
                    });
                  }
                  setSelectedCards(newList);
                }}
                selectedCards={selectedCards}
              />
            ))}
        </div>
        <p className="text-center">
          Selected:{" "}
          <span className="text-primary-brown">
            {selectedCards.length > 0 ? `${selectedCards.length}` : "None"}
          </span>
        </p>
      </div>

      <div
        className="w-full h-full flex-grow flex items-end justify-end"
        onClick={() => {
          onSubmit();
        }}
      >
        <PrimaryButton>Move To Answer Stage</PrimaryButton>
      </div>
    </div>
  );
}

export default RenderScenario;
