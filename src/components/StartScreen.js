import React from "react";

function StartScreen({ questionNo, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!!!!</h2>
      <h3>{questionNo} question to the test to React Mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "active" })}
      >
        Let's Start
      </button>
    </div>
  );
}

export default StartScreen;
