import { useState } from "react";
import { quizData as q } from "./data.js";
import { useEffect } from "react";

function App() {
  const [curr, setcurr] = useState(0);
  const [userAnsweredArray, setuserAnsweredArray] = useState([]);
  const [userAnswer, setuserAnswer] = useState(null);
  const [erroMsg, seterroMsg] = useState("");
  const [Score, setScore] = useState(0);

  function CheckIsAnsweredPreviously(quetion_id) {
    let isAnsweredPreviously = false;

    userAnsweredArray.find((Answer) => {
      if (Answer.quetion_id == quetion_id) {
        isAnsweredPreviously = Answer;
      }
    });

    return isAnsweredPreviously;
  }

  function AddUserTickedAnswer() {
    if (userAnswer !== null) {
      let quetion_id = q[curr].id;

      // If answered before, update the answer
      const updatedAnswers = userAnsweredArray.map((Answer) => {
        if (Answer.quetion_id === quetion_id) {
          return { ...Answer, user_ans: userAnswer };
        }
        return Answer;
      });

      const isAnsweredPreviously = CheckIsAnsweredPreviously(quetion_id);

      if (!isAnsweredPreviously) {
        setuserAnsweredArray((prevAns) => [
          ...prevAns,
          {
            quetion_id: quetion_id,
            correct_ans: q[curr].correct,
            user_ans: userAnswer,
          },
        ]);
      } else {
        setuserAnsweredArray(updatedAnswers);
      }

      setcurr((prevCurr) => prevCurr + 1);
    } else {
      seterroMsg("Please select an answer!");
    }
  }

  function PrevQuetions(prev_quetion_id, curr_quetion_no) {
    if (curr_quetion_no >= 0) {
      const previousAnswer = userAnsweredArray.find(
        (answer) => answer.quetion_id === prev_quetion_id
      );

      if (previousAnswer) {
        setuserAnswer(previousAnswer.user_ans);
      }
      setcurr(curr_quetion_no);
    }
  }

  function loadTheAnswerForCurrentQuetion(curr) {
    const isChecked = CheckIsAnsweredPreviously(q[curr].id);
    if (isChecked) {
      setuserAnswer(isChecked.user_ans);
    } else {
      setuserAnswer(null);
    }
  }

  useEffect(() => {
    loadTheAnswerForCurrentQuetion(curr);

    if (curr >= q.length) {
      userAnsweredArray.map((answer) => {
        if (answer.user_ans === answer.correct_ans) {
          setScore((prevScore) => prevScore + 1);
        }
      });
    }
  }, [curr, userAnsweredArray]);

  setTimeout(() => {
    seterroMsg("");
  }, 3000);

  return curr < q.length ? (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-xl w-full">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {curr + 1}. {q[curr].question}
          </h2>

          <div
            className="flex items-center mb-4 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
            onClick={() => setuserAnswer("a")}
          >
            <input
              type="radio"
              name="checkAnswer"
              id="a"
              value="a"
              checked={userAnswer === "a"} // Set checked based on userAnswer state
              onChange={() => setuserAnswer("a")}
              className="mr-4"
            />
            <p className="text-gray-700">{q[curr].a}</p>
          </div>

          <div
            className="flex items-center mb-4 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
            onClick={() => setuserAnswer("b")}
          >
            <input
              type="radio"
              name="checkAnswer"
              id="b"
              value="b"
              checked={userAnswer === "b"}
              onChange={() => setuserAnswer("b")}
              className="mr-4"
            />
            <p className="text-gray-700">{q[curr].b}</p>
          </div>

          <div
            className="flex items-center mb-4 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
            onClick={() => setuserAnswer("c")}
          >
            <input
              type="radio"
              name="checkAnswer"
              id="c"
              value="c"
              checked={userAnswer === "c"}
              onChange={() => setuserAnswer("c")}
              className="mr-4"
            />
            <p className="text-gray-700">{q[curr].c}</p>
          </div>

          <div
            className="flex items-center mb-4 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
            onClick={() => setuserAnswer("d")}
          >
            <input
              type="radio"
              name="checkAnswer"
              id="d"
              value="d"
              checked={userAnswer === "d"}
              onChange={() => setuserAnswer("d")}
              className="mr-4"
            />
            <p className="text-gray-700">{q[curr].d}</p>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div>
              {erroMsg && (
                <p className="text-red-500 text-sm mb-0 ">{erroMsg}</p>
              )}
            </div>

            <div className="flex gap-4 w-1/2 justify-end">
              <button
                type="button"
                onClick={() => PrevQuetions(q[curr - 1].id, curr - 1)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Prev
              </button>
              <button
                type="button"
                onClick={() => AddUserTickedAnswer(curr)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <p>
        You have Scored-{Score}/{q.length}
      </p>
    </div>
  );
}

export default App;
