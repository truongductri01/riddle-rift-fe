import React from "react";
import { cardTypes } from "./cards/cards";
import HeartIcon from "../icons/HeartIcon";
import LightningIcon from "../icons/LightningIcon";
import ShieldIcon from "../icons/ShieldIcon";

function SmallCard({ type, text, imgSource, isCovered, coveredText }) {
  return (
    <div className="SmallCards relative w-[10rem] h-[3.75rem] bg-white rounded-[0.5rem] flex shrink-0 items-center">
      {isCovered && (
        <div className="w-full h-full absolute z-10 top-0 left-0 bg-white bg-opacity-80 backdrop-blur-[1px] rounded-[0.5rem] flex items-center justify-center">
          <p className="text-black">{coveredText}</p>
        </div>
      )}

      <div className="relative w-[3.75rem] h-[3.75rem] flex justify-center items-end shrink-0 pb-[0.25rem]">
        <img
          alt="text"
          className="absolute top-0 left-0 rounded-[0.5rem] z-0"
          src={imgSource}
        />

        <div className="relative z-[1] flex items-center justify-center gap-[0.25rem] px-[0.5rem] bg-white rounded-[0.25rem]">
          {type === cardTypes.HEALING && (
            <HeartIcon width={"0.5rem"} height={"0.5rem"} color={"black"} />
          )}
          {type === cardTypes.ATTACK && (
            <LightningIcon width={"0.5rem"} height={"0.5rem"} color={"black"} />
          )}
          {type === cardTypes.DEFENSE && (
            <ShieldIcon width={"0.5rem"} height={"0.5rem"} color={"black"} />
          )}
          <p className="z-[1] text-[0.5rem]">{type}</p>
        </div>
      </div>
      <p className="w-full text-[0.75rem] text-center mx-[0.25rem]">{text}</p>
    </div>
  );
}

export default SmallCard;
