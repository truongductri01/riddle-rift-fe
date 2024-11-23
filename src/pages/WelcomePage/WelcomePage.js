import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import RiddleRiftText from "../../components/RiddleRiftText/RiddleRiftText";
import PrimaryButton from "../../components/PrimaryButton";
import "./WelcomePage.css";
import { imgSources } from "../../assets/imageSources";

function WelcomePage() {
  const [start, setStart] = useState(false);
  const [maskUrl, setMaskUrl] = useState("");

  useEffect(() => {
    const timestamp = new Date().getTime();
    setMaskUrl(`${imgSources.INK_SPLASH}?${timestamp}`);
  }, []);
  return (
    <div>
      {start ? (
        <Outlet />
      ) : (
        <div
          className="w-full h-full WelcomePage"
          style={{
            WebkitMaskImage: `url(${maskUrl})`,
            maskImage: `url(${maskUrl})`,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "cover",
            maskSize: "cover",
            maskPosition: "center",
          }}
        >
          <div className="DelayAppear w-full h-full bg-secondary-brown bg-opacity-60 flex flex-col justify-center items-center gap-[1rem] p-[1rem]">
            <div className="w-full self-center grow-[1] flex flex-col items-center justify-center">
              <p className="text-[1.50rem]">Welcome to</p>
              <RiddleRiftText></RiddleRiftText>
            </div>
            <PrimaryButton
              onClick={() => setStart(true)}
              className="bg-primary-green text-[1rem] w-full shrink-0"
            >
              Let's Start
            </PrimaryButton>
          </div>
        </div>
      )}
    </div>
  );
}

export default WelcomePage;
