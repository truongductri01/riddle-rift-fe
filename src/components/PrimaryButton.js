import React from "react";

function PrimaryButton({ children, className, onClick }) {
  return (
    <div
      onClick={onClick}
      className={
        " flex items-center justify-center py-[0.5rem] px-[1.5rem] bg-primary-blue text-white rounded-[0.5rem] border-white border-[1px] cursor-pointer " +
        className
      }
    >
      {children}
    </div>
  );
}

export default PrimaryButton;
