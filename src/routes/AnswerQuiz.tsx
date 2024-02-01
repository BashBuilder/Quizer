import { initialQuizState } from "@/data/data";
import { Quiz } from "@/data/quizTypes";
import { useQuizContext } from "@/hooks/quizContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AnswerQuiz() {
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [question, setQuestion] = useState<Quiz>(initialQuizState);
  const [opt, setOpt] = useState<string[]>([]);
  const { quiz } = useQuizContext();
  const { setOptions, result, submitQuiz } = useQuizContext();
  const { answers, isubmitted, correctAnswer } = result;

  const navigate = useNavigate();

  // Set questions base on the current question index
  useEffect(() => {
    setQuestion(quiz[quizIndex]);
    // eslint-disable-next-line
  }, [quizIndex]);

  // shuffle the currect option and the incorrect options
  useEffect(() => {
    const allOptions = [question.correct_answer, ...question.incorrect_answers];
    const shuffledOptions: string[] = allOptions.sort(
      () => Math.random() - 0.5,
    );
    setOpt(shuffledOptions);
    // eslint-disable-next-line
  }, [question]);

  // Navigate between questions based on button clics
  const handleNextQuestion = (num: number) =>
    setQuizIndex((prev) => prev + num);

  // handle navigation when quiz is submitted
  const handleSubmitQuiz = () => {
    !isubmitted ? navigate("/results") : navigate("/");
    submitQuiz();
  };

  return (
    <div>
      <section className="flex min-h-[600px] flex-col items-center justify-center gap-6 ">
        <button
          className="bg-orange-600 text-lg font-semibold text-white hover:opacity-90 hover:shadow-md"
          onClick={handleSubmitQuiz}
        >
          {!isubmitted ? "Submit" : "Home"}
        </button>
        {/* Display questions */}
        <article className=" mx-auto flex min-h-96 w-[90vw] max-w-5xl flex-col gap-8 rounded-3xl bg-orange-100 p-4  shadow-2xl md:px-20 md:py-10 ">
          <div className="flex justify-center gap-2 text-center">
            <p className="text-xl "> {quizIndex + 1}. </p>
            <p
              className="text-xl"
              dangerouslySetInnerHTML={{ __html: question.question }}
            />
          </div>

          {/* handle options state */}
          <div className="mx-auto mt-4 flex w-4/5 flex-col gap-4">
            {opt.map((option, index) => {
              const currentOption = answers.filter(
                (ans) => ans.number === quizIndex + 1,
              )[0]?.answer;
              const isOption = currentOption === option;
              let isCorrectAnswer, correction;
              if (isubmitted) {
                const currentAns = correctAnswer?.filter(
                  (ans) => ans.number === quizIndex + 1,
                )[0]?.answer;
                isCorrectAnswer = currentAns === currentOption && isOption;
                correction =
                  currentAns !== currentOption && currentAns === option;
              }

              return (
                <button
                  key={index}
                  className={` hover:shadow-md ${isubmitted ? (isCorrectAnswer ? "bg-green-600 text-white" : correction ? "bg-red-600 text-white" : isOption ? "bg-orange-600 text-white" : "bg-orange-200") : isOption ? "bg-orange-600 text-white" : "bg-orange-200 hover:bg-orange-300 "} `}
                  onClick={() => setOptions(quizIndex + 1, option)}
                  dangerouslySetInnerHTML={{ __html: option }}
                  disabled={isubmitted}
                />
              );
            })}
          </div>
          <div className="flex justify-between ">
            <button
              className="bg-orange-300 hover:bg-orange-400 hover:shadow-lg disabled:opacity-35"
              onClick={() => handleNextQuestion(-1)}
              disabled={quizIndex === 0}
            >
              Previous
            </button>
            <button
              className="bg-orange-300 hover:bg-orange-400 hover:shadow-lg disabled:opacity-35 "
              onClick={() => handleNextQuestion(1)}
              disabled={quizIndex + 1 === quiz.length}
            >
              Next
            </button>
          </div>
        </article>
      </section>
    </div>
  );
}
