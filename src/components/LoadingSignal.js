import React from "react";
import Loading from "./Loading";

const LoadingSignal = ({ showLoading }) => {
  return (
    <>
      {showLoading && (
        <div className=" fixed top-0 left-0 w-full h-full flex items-center justify-center bg-third-brown bg-opacity-40 z-10 backdrop-blur-[1px]">
          <Loading />
        </div>
      )}
    </>
  );
};

export default LoadingSignal;
