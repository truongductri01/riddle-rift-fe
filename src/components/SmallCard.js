import React from "react";
import { cards, cardTypes } from "./cards/cards";
import HeartIcon from "../icons/HeartIcon";
import LightningIcon from "../icons/LightningIcon";
import ShieldIcon from "../icons/ShieldIcon";
import SwapIcon from "../icons/SwapIcon";
import BlockIcon from "../icons/BlockIcon";

let commonIconProps = {
  width: "0.5rem",
  height: "0.5rem",
  color: "black",
};

function SmallCard({ type, text, imgSource, isCovered, coveredText }) {
  return (
    <div className="SmallCards relative max-w-full w-[20rem] h-[3.75rem] bg-white rounded-[0.5rem] flex shrink-0 items-center">
      {isCovered && (
        <div className="w-full h-full absolute z-10 top-0 left-0 bg-white bg-opacity-80 backdrop-blur-[1px] rounded-[0.5rem] flex items-center justify-center">
          <p className="text-black">{coveredText}</p>
        </div>
      )}

      <div className="relative w-[3.75rem] h-[3.75rem] flex justify-center items-end shrink-0 pb-[0.25rem]">
        <img
          alt="text"
          className="absolute top-0 left-0 rounded-[0.5rem] z-0"
          src={imgSource ?? cards[type].img}
        />

        <div className="relative z-[1] flex items-center justify-center gap-[0.25rem] px-[0.5rem] bg-white rounded-[0.25rem]">
          {type === cardTypes.HEALING && <HeartIcon {...commonIconProps} />}
          {type === cardTypes.ATTACK && <LightningIcon {...commonIconProps} />}
          {type === cardTypes.DEFENSE && <ShieldIcon {...commonIconProps} />}
          {type === cardTypes.SWAP_HEALTH && <SwapIcon {...commonIconProps} />}
          {type === cardTypes.BLOCK_SWAP_HEALTH && (
            <BlockIcon {...commonIconProps} />
          )}
          <p className="z-[1] text-[0.5rem]">{cards[type]?.name ?? type}</p>
        </div>
      </div>
      <p className="w-full text-[0.75rem] text-center mx-[0.25rem]">{text}</p>
    </div>
  );
}

export default SmallCard;
