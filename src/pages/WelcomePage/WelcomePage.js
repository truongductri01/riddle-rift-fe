import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import RiddleRiftText from "../../components/RiddleRiftText/RiddleRiftText";
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
    <div className="w-full h-full flex flex-col max-h-full max-w-full WelcomePage">
      {start ? (
        <Outlet />
      ) : (
        <div
          className="w-full h-full WelcomePage-Screen"
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
          <div className="DelayAppear w-full h-full bg-secondary-brown bg-opacity-60 opacity-0 flex flex-col gap-[1rem] p-[1rem]">
            <div className="w-full self-center grow-[1] flex flex-col items-center justify-center">
              <p className="text-[1.50rem]">Welcome to</p>
              <RiddleRiftText></RiddleRiftText>
            </div>
            <button
              onClick={() => setStart(true)}
              className="text-[1rem] w-max shrink-0 bg-black text-white px-[1.5rem] py-[0.5rem] rounded-md float-right ml-auto fadeInAnimation opacity-0"
            >
              Let's Start
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default WelcomePage;
