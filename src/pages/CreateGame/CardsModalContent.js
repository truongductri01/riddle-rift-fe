import React, { useEffect, useState } from "react";
import {
  allowCards,
  getDefaultCardsSetting,
} from "../../components/cards/cards";
import { NumberInputForm, NumberInputFormVertical } from "./CreateGame";
import SmallCard from "../../components/SmallCard";
import SecondaryButton from "../../components/SecondaryButton";
import PrimaryButton from "../../components/PrimaryButton";

function CardsModalContent({
  maxCard,
  teams,
  cardsAmountConfig,
  setCardsAmountConfig,
  cardsTotal,
  setCardsTotal,
  showCardsModal,
  setShowCardsModal,
}) {
  const [error, setError] = useState("");
  const [currentCount, setCurrentCount] = useState(cardsTotal);
  const [tempoCardsAmountConfig, setTempoCardsAmountConfig] = useState({});

  useEffect(() => {
    if (Object.keys(cardsAmountConfig).length === 0) {
      setTempoCardsAmountConfig(getDefaultCardsSetting());
    } else {
      setTempoCardsAmountConfig(cardsAmountConfig);
    }
  }, []);

  useEffect(() => {
    // calculate the new current
    let newCurrentCount = 0;
    Object.keys(tempoCardsAmountConfig).forEach((key) => {
      if (typeof tempoCardsAmountConfig[key] === "number") {
        newCurrentCount += tempoCardsAmountConfig[key];
      }
    });
    setCurrentCount(newCurrentCount);
  }, [tempoCardsAmountConfig]);

  useEffect(() => {
    if (typeof maxCard === "number" && currentCount < maxCard * teams.length) {
      setError(`Not enough card, at least: ${maxCard * teams.length}`);
    } else {
      setError("");
    }
  }, [currentCount]);

  const handleSingleCardCountChange = (value, cardType) => {
    let newValue = value;
    if (value) {
      newValue = Number.parseInt(value);
    }
    let newConfig = { ...tempoCardsAmountConfig, [cardType]: newValue };
    setTempoCardsAmountConfig({ ...newConfig });
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start gap-[1rem]">
      <p className="text-[1.25rem]">Cards Amount</p>

      <div className="w-full flex items-center justify-center">
        <p className="shrink-0">
          Expected total:{" "}
          <span className="text-primary-brown">{currentCount} cards</span>
        </p>
      </div>

      <div className="w-full h-full flex flex-col gap-[1rem] overflow-auto">
        {allowCards.map((card) => {
          return (
            <div
              className="w-full flex justify-between flex-wrap gap-[0.25rem]"
              key={card.type}
            >
              <SmallCard
                text={card.text}
                type={card.type}
                imgSource={card.img}
              />

              {/* <NumberInputFormVertical
                secondPTag=""
                placeholder="now: 0"
                value={tempoCardsAmountConfig[card.type]}
                onChange={(value) => {
                  handleSingleCardCountChange(value, card.type);
                }}
                className={" ml-auto float-right"}
              /> */}
            </div>
          );
        })}
      </div>

      {error && <p className="text-primary-red">{error}</p>}

      <div className="w-full mt-auto shrink-0 flex justify-end gap-[0.5rem]">
        <SecondaryButton
          onClick={() => {
            setShowCardsModal(false);

            setTempoCardsAmountConfig({});
          }}
        >
          <p>Cancel</p>
        </SecondaryButton>

        <PrimaryButton
          className="bg-primary-green"
          onClick={() => {
            if (!error) {
              setShowCardsModal(false);

              setCardsTotal(currentCount);
              setCardsAmountConfig({ ...tempoCardsAmountConfig });
            }
          }}
        >
          <p>Save & Close</p>
        </PrimaryButton>
      </div>
    </div>
  );
}

export default CardsModalContent;
