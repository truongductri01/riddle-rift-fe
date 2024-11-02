import React, { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";

function ConfettiComponent() {
  const [showConfetti, setShowConfetti] = useState(true);
  const ref = useRef();

  useEffect(() => {
    setTimeout(() => setShowConfetti(false), 5000);
  }, []);

  return (
    <div className="Confetti w-full h-full absolute" ref={ref}>
      {showConfetti && (
        <Confetti
          width={ref?.current?.getBoundingClientRect()?.width || 0}
          height={ref?.current?.getBoundingClientRect()?.height || 0}
          numberOfPieces={50}
          gravity={0.1}
          colors={["#FFC107", "#03A9F4", "#E91E63", "#4CAF50"]}
        />
      )}
    </div>
  );
}

export default ConfettiComponent;
