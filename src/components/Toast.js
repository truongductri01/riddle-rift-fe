import React from "react";

function Toast({ message }) {
  return (
    <div className="fixed top-[0.5rem] right-[0.5rem] w-max min-w-[10rem] bg-primary-blue text-white text-[1rem] p-[0.25rem] rounded-md flex justify-center items-center">
      <p>{message}</p>
    </div>
  );
}

export default Toast;
