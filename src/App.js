import { useEffect, useReducer } from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Question";
import NextQuestion from "./components/NextQuestion";
import Progress from "./components/Progress";
import Finished from "./components/Finished";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const initialState = {
  questions: [],
  //'loading', 'ready', 'error', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  timeRemaining: null,
};
const QUEST_TIME = 30;
let questionNo;
let maxPoints;

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "active":
      return {
        ...state,
        status: "active",
        timeRemaining: Number(state.questions.length) * QUEST_TIME,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + Number(question.points)
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finished":
      return { ...state, status: "finished", answer: null };
    case "restart":
      return { ...initialState, status: "ready", questions: state.questions };
    case "tick":
      return {
        ...state,
        status: state.timeRemaining <= 0 ? "finished" : "active",
        timeRemaining: state.timeRemaining - 1,
      };
    default:
      throw new Error("Unknown type");
  }
}

function App() {
  const [
    { status, questions, index, answer, points, timeRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "dataReceived", payload: data });
        questionNo = data?.length;
        maxPoints = data?.reduce((prev, curr) => prev + curr.points, 0);
      })
      .catch((error) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen questionNo={questionNo} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              numQuestion={questionNo}
              index={index}
              answer={answer}
              points={points}
              maxPoints={maxPoints}
            />
            <Questions
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <NextQuestion
                dispatch={dispatch}
                answer={answer}
                numQuestion={questionNo}
                index={index}
              />
              <Timer timeRemaining={timeRemaining} dispatch={dispatch} />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <Finished
            points={points}
            maxPoints={maxPoints}
            maxQuestions={questionNo}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
