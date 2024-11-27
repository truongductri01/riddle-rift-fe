import React from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton";

function StartingScreen() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-[1.25rem]">
      <p>
        Welcome to{" "}
        <span className="text-[1.5rem] text-primary-brown">Riddle Rift</span>
      </p>
      <div className="w-full h-max flex justify-center items-center gap-[1rem]">
        <PrimaryButton
          className="bg-primary-green"
          onClick={() => {
            navigate("/create");
          }}
        >
          Create Game
        </PrimaryButton>
        <PrimaryButton
          onClick={() => {
            navigate("/join");
          }}
        >
          Join Game
        </PrimaryButton>
      </div>
    </div>
  );
}

export default StartingScreen;
