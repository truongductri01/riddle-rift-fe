import React from "react";

function LightningIcon({ width, height, color, className, onClick }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      viewBox="0 0 24 24"
      width={width}
      fill={color}
      className={className}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M7 2v11h3v9l7-12h-4l3-8z" />
    </svg>
  );
}



export default LightningIcon;
