export default function NextQuestion({ dispatch, answer, numQuestion, index }) {
  if (answer === null) return;
  return (
    <div>
      {index + 1 < numQuestion ? (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      ) : (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "finished" })}
        >
          Finish
        </button>
      )}
    </div>
  );
}
