function Options({ options, dispatch, answer, correctOption }) {
  console.log(answer, correctOption);
  return (
    <div className="options">
      {options.map((option, index) => {
        console.log(option, index);
        return (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              answer !== null
                ? index === correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }
          }`}
            key={option}
            disabled={answer !== null}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
