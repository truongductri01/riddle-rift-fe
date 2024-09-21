import React, { useEffect, useState } from "react";

function Timer({ initialTime, setTimeUp }) {
  // Initial time in seconds (1 hour)
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timerInterval);
          // Perform actions when the timer reaches zero
          console.log("Countdown complete!");
          setTimeUp?.(true);
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(timerInterval);
  }, []); // The empty dependency array ensures the effect runs only once on mount

  // Convert seconds to hours, minutes, and seconds
  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <p className="text-[0.75rem]">Remaining time to answer:</p>
      <div
        className={`flex items-center gap-[1rem] ${
          timeRemaining <= 10 ? "text-primary-red" : "text-primary-blue"
        }`}
      >
        <p>
          <span className="text-[1.5rem]">{hours}</span>
          <span className="text-[0.75rem]">h</span>
        </p>
        <p>
          <span className="text-[1.5rem]">{minutes}</span>
          <span className="text-[0.75rem]">m</span>
        </p>
        <p>
          <span className="text-[1.5rem]">{seconds}</span>
          <span className="text-[0.75rem]">s</span>
        </p>
      </div>
    </div>
  );
}

export default Timer;
