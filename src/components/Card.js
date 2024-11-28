import React, { useRef } from "react";
import HeartIcon from "../icons/HeartIcon";
import { cards, cardTypes } from "./cards/cards";
import ShieldIcon from "../icons/ShieldIcon";
import LightningIcon from "../icons/LightningIcon";
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
      className={`Card h-[10rem] w-[7rem] flex rounded-[0.5rem] transition-all duration-75 ease-in-out flex-col shadow-[0.25rem_0.25rem_1rem_#fbf4df]`}
      ref={ref}
      style={{
        backgroundImage: `url(${cards[card.type].img})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div
        onClick={() => {
          onSelectChange(!selected);
        }}
        className={`flex-shrink-0 w-full h-full flex flex-col rounded-[0.5rem] cursor-pointer relative`}
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
          className={`w-full h-full rounded-[0.5rem] py-[0.25rem] px-[0.25rem] 
            flex flex-col justify-between items-center z-[1]
            ${
              selected
                ? "bg-none"
                : "bg-gradient-to-t from-secondary-brown/95 to-white/80 bg-opacity-85"
            }`}
        >
          <div
            className={`z-[1] w-full flex items-center justify-center 
              gap-[0.25rem] px-[0.25rem] bg-white rounded-[0.5rem]
              ${selected && " mt-auto "}`}
          >
            <CardTypeRender card={card} />
          </div>
          {!selected && (
            <p className="w-full text-[0.75rem] text-center">{card.text}</p>
          )}
        </div>
      </div>
    </div>
  );
};

const CardTypeRender = ({ card }) => {
  return (
    <>
      {card.type === cardTypes.HEALING && (
        <HeartIcon width={"0.75rem"} height={"0.75rem"} color={"black"} />
      )}
      {card.type === cardTypes.ATTACK && (
        <LightningIcon width={"0.75rem"} height={"0.75rem"} color={"black"} />
      )}
      {card.type === cardTypes.DEFENSE && (
        <ShieldIcon width={"0.75rem"} height={"0.75rem"} color={"black"} />
      )}
      {card.type === cardTypes.SWAP_HEALTH && (
        <SwapIcon width={"0.75rem"} height={"0.75rem"} color={"black"} />
      )}
      {card.type === cardTypes.BLOCK_SWAP_HEALTH && (
        <BlockIcon width={"0.75rem"} height={"0.75rem"} color={"black"} />
      )}
      <p className="text-[0.75rem]">{cards[card.type]?.name ?? card.type}</p>
    </>
  );
};

export default Card;
