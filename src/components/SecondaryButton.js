import React from "react";

function SecondaryButton({ children, className, onClick }) {
  return (
    <div
      onClick={onClick}
      className={
        "flex w-max h-max items-center justify-center py-[0.5rem] px-[1.5rem] bg-primary-white text-black rounded-[0.5rem] border-primary-brown border-[1px] cursor-pointer " +
        className
      }
    >
      {children}
    </div>
  );
}

export default SecondaryButton;
