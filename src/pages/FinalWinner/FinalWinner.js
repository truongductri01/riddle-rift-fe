import React from "react";
import PrimaryButton from "../../components/PrimaryButton";
import { useNavigate } from "react-router-dom";

function FinalWinner({ game }) {
  const { finalWinner, currentRound, teams } = game;

  const navigate = useNavigate();

  return (
    <div className="FinalWinner w-full h-full flex flex-col bg-white bg-opacity-50 backdrop-blur-md rounded-[0.5rem] px-[1.25rem] pb-[1.25rem] gap-[1.25rem] items-center">
      {/* Final winner */}
      <div className="w-full relative h-[15rem] flex items-center justify-center shrink-0">
        <div className="text-white bg-primary-purple rounded-full px-[5rem] py-[1rem] flex flex-col items-center justify-center relative z-10 slide-in-right">
          <p className="text-[1.25rem]">{teams?.[finalWinner]?.name}</p>
          <p className="text-[0.75rem]">Final Winner</p>
        </div>
        <div className="absolute inset-0 m-auto rounded-full bg-primary-yellow w-[10rem] h-[10rem] z-0"></div>
      </div>

      {/* Ranking board */}
      <div className="w-full h-full flex flex-col gap-[0.75rem] overflow-auto">
        {Object.keys(teams)
          .sort(
            // team with more health point shows up first
            (a, b) =>
              currentRound?.result?.teams?.[b]?.healthPoint -
              currentRound?.result?.teams?.[a]?.healthPoint
          )
          .map((tId, index) => (
            <div className="w-full flex items-center gap-[1rem]" key={tId}>
              <p className="w-[1.5rem] text-black text-[1.5rem]">{index + 1}</p>
              <div className="w-full flex items-center justify-between text-primary-brown bg-white border-2 border-primary-brown rounded-[0.5rem] px-[1.25rem] py-[0.25rem]">
                <p>{teams[tId]?.name}</p>
                <p>Health: {currentRound?.result?.teams?.[tId]?.healthPoint}</p>
              </div>
            </div>
          ))}
      </div>

      <PrimaryButton
        className="w-max rounded-full"
        onClick={() => {
          navigate("/create");
          localStorage.clear();
          window.location.reload();
        }}
      >
        Create a new game
      </PrimaryButton>

      <PrimaryButton
        className="w-max rounded-full"
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
      >
        Join a new game
      </PrimaryButton>
    </div>
  );
}

export default FinalWinner;
