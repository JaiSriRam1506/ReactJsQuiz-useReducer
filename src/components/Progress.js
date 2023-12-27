import React from "react";

export default function Progress({
  numQuestion,
  index,
  answer,
  points,
  maxPoints,
}) {
  console.log(index);
  return (
    <header className="progress">
      <progress max={numQuestion} value={index + Number(answer !== null)} />
      <p>
        Questions <strong>{index + 1}</strong>/{numQuestion}
      </p>
      <p>
        <strong>
          {points}/{maxPoints}
        </strong>
      </p>
    </header>
  );
}
