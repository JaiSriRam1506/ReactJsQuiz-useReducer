import React, { useEffect } from "react";

export default function Timer({ timeRemaining, dispatch }) {
  const min = Math.floor(timeRemaining / 60);
  const sec = Math.floor(timeRemaining % 60);
  useEffect(
    function () {
      let timeOut = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(timeOut);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {min < 9 ? `0${min}` : min}:{sec < 9 ? `0${sec}` : sec}
    </div>
  );
}
