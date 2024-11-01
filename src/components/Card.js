import React, { useRef, useState } from "react";
import HeartIcon from "../icons/HeartIcon";
import { cards, cardTypes } from "./cards/cards";
import ShieldIcon from "../icons/ShieldIcon";
import { imgSources } from "../assets/imageSources";
import LightningIcon from "../icons/LightningIcon";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import CheckIcon from "../icons/CheckIcon";
import { colors } from "../assets/colors";
import SwapIcon from "../icons/SwapIcon";
import BlockIcon from "../icons/BlockIcon";

const Card = ({ card, onSelectChange, selectedCards }) => {
  const ref = useRef();
  const selected = selectedCards.some((c) => c.id === card.id);

  return (
    <div
      key={card.id}
      className={`Card h-[10rem] w-[6.25rem] flex  rounded-[0.5rem] transition-all duration-75 ease-in-out  flex-col bg-white`}
      ref={ref}
    >
      <div
        onClick={() => {
          onSelectChange(!selected);
        }}
        className={`flex-shrink-0 w-full h-full bg-white flex flex-col rounded-[0.5rem] cursor-pointer relative`}
      >
        {selected && (
          <CheckIcon
            width={"1.5rem"}
            height={"1.5rem"}
            color={colors["black"]}
            className="z-[2] mb-auto bg-primary-yellow rounded-[0.5rem] absolute top-0 right-0"
          />
        )}

        <div
          className={`w-full h-full flex items-center absolute ${
            selected ? "z-[1] bg-white bg-opacity-85" : "z-0"
          }`}
        >
          <div className="w-[6.25rem] h-[6.25rem] relative flex flex-col justify-end items-end pb-[0.5rem]">
            <div className="z-[1] flex items-center justify-center gap-[0.25rem] px-[0.25rem] bg-white rounded-l-[0.25rem] bg-opacity-80">
              {card.type === cardTypes.HEALING && (
                <HeartIcon
                  width={"0.75rem"}
                  height={"0.75rem"}
                  color={"black"}
                />
              )}
              {card.type === cardTypes.ATTACK && (
                <LightningIcon
                  width={"0.75rem"}
                  height={"0.75rem"}
                  color={"black"}
                />
              )}
              {card.type === cardTypes.DEFENSE && (
                <ShieldIcon
                  width={"0.75rem"}
                  height={"0.75rem"}
                  color={"black"}
                />
              )}
              {card.type === cardTypes.SWAP_HEALTH && (
                <SwapIcon
                  width={"0.75rem"}
                  height={"0.75rem"}
                  color={"black"}
                />
              )}
              {card.type === cardTypes.BLOCK_SWAP_HEALTH && (
                <BlockIcon
                  width={"0.75rem"}
                  height={"0.75rem"}
                  color={"black"}
                />
              )}
              <p className="text-[0.75rem]">
                {cards[card.type]?.name ?? card.type}
              </p>
            </div>
            <img
              alt="text"
              src={cards[card.type].img}
              className="w-[6.25rem] h-[6.25rem] absolute top-0 left-0 z-0 rounded-[0.5rem]"
            />
          </div>
        </div>
        <div
          className={`w-full h-full py-[0.25rem] px-[0.125rem] flex justify-center items-center ${
            selected ? "z-0" : "z-[1] bg-white bg-opacity-85"
          }`}
        >
          <p className="w-full text-[0.75rem] text-center">{card.text}</p>
        </div>
      </div>
    </div>
  );
};

const AdvancedCard = ({ card, onSelectChange, selectedCardIds }) => {
  const ref = useRef();
  const [clicked, setClicked] = useState(false);
  const [selected, setSelected] = useState(selectedCardIds.includes(card.id));
  return (
    <div
      key={card.id}
      className={`Card h-[10rem] flex  rounded-[0.5rem] transition-all duration-75 ease-in-out ${
        clicked
          ? "Card-Grid absolute top-0 left-0 w-full h-full flex-row z-10 grid grid-cols-[auto_1fr] grid-rows-[10rem_1fr] bg-third-brown p-[1rem]"
          : "w-[6.25rem] flex flex-col bg-white"
      }`}
      ref={ref}
    >
      <div
        onClick={() => {
          setClicked((prev) => !prev);
        }}
        className={`flex-shrink-0 w-[6.25rem] h-[10rem] bg-white flex flex-col rounded-[0.5rem] cursor-pointer relative ${
          clicked
            ? "border-r-black border-r-2 border-b-black border-b-2 w-[6.35rem]"
            : ""
        }`}
      >
        <div className="w-[6.25rem] h-[6.25rem] relative flex flex-col justify-end items-end pb-[0.5rem]">
          {selected && (
            <CheckIcon
              width={"1.5rem"}
              height={"1.5rem"}
              color={colors["black"]}
              className="z-[1] mb-auto bg-primary-yellow rounded-[0.5rem]"
            />
          )}
          <div className="z-[1] flex items-center justify-center gap-[0.25rem] px-[0.25rem] bg-white rounded-l-[0.25rem]">
            {card.type === cardTypes.HEALING && (
              <HeartIcon width={"0.75rem"} height={"0.75rem"} color={"black"} />
            )}
            {card.type === cardTypes.ATTACK && (
              <LightningIcon
                width={"0.75rem"}
                height={"0.75rem"}
                color={"black"}
              />
            )}
            {card.type === cardTypes.DEFENSE && (
              <ShieldIcon
                width={"0.75rem"}
                height={"0.75rem"}
                color={"black"}
              />
            )}
            <p className="text-[0.75rem]">{card.type}</p>
          </div>
          <img
            alt="text"
            src={
              card.type === cardTypes.ATTACK
                ? imgSources.SWORD
                : card.type === cardTypes.DEFENSE
                ? imgSources.SHIELD
                : imgSources.POTION
            }
            className="w-full h-full absolute top-0 left-0 z-0 rounded-[0.5rem]"
          />
        </div>
        <div className="w-full py-[0.25rem] px-[0.125rem]">
          <p className="w-full text-[0.75rem] text-center">{card.text}</p>
        </div>
      </div>

      {clicked && (
        <div className="ClickedCover flex-grow top-0 left-0 w-full h-full z-10 flex flex-col items-center justify-center gap-[1rem] p-[0.5rem]">
          <PrimaryButton
            className="w-full bg-primary-green"
            onClick={() => {
              setClicked(false);
              onSelectChange(!selected);
              setSelected((prev) => !prev);
            }}
          >
            <p>{!selected ? "Select for Round" : "Deselect"}</p>
          </PrimaryButton>

          {card.isInstant && (
            <PrimaryButton
              className="w-full bg-primary-red "
              onClick={() => {
                setClicked(false);
                setSelected((prev) => !prev);
              }}
            >
              <p className="text-black">Instant Use</p>
            </PrimaryButton>
          )}
        </div>
      )}

      {clicked && (
        <div className="col-[1_/_span_2] flex flex-col p-[0.5rem]">
          <div className="w-full h-full flex flex-col justify-center items-center px-[2rem]">
            <p className="text-center">{card.text}</p>
          </div>
          <div className="w-full flex justify-end gap-[0.5rem]">
            <SecondaryButton onClick={() => setClicked(false)}>
              <p className="text-[0.90rem]">Close</p>
            </SecondaryButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
