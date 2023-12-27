import React from "react";

export default function Finished({
  points,
  maxPoints,
  maxQuestions,
  dispatch,
}) {
  const percentage = (points / maxPoints) * 100;
  return (
    <>
      <p className="result">
        Your score is <strong>{points}</strong> out of possible {maxQuestions}{" "}
        Questions(
        {Math.ceil(percentage)}%)
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}
