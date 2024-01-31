import Navbar from "@/components/Navbar";
import { initialQuizState } from "@/data/data";
import { Quiz } from "@/data/quizTypes";
import { useQuizContext } from "@/hooks/quizContext";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function AnswerQuiz() {
  const [isOptionSelected, setIsOptionSelected] = useState(true);
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [question, setQuestion] = useState<Quiz>(initialQuizState);
  const [options, setOptions] = useState<string[]>([]);
  const { quiz } = useQuizContext();
  useEffect(() => {
    setQuestion(quiz[quizIndex]);
    // eslint-disable-next-line
  }, [quizIndex]);

  useEffect(() => {
    const allOptions = [question.correct_answer, ...question.incorrect_answers];
    const shuffledOptions: string[] = allOptions.sort(
      () => Math.random() - 0.5,
    );
    setOptions(shuffledOptions);
  }, [question]);

  const handleNextQuestion = (num: number) =>
    setQuizIndex((prev) => prev + num);

  return (
    <div>
      <Navbar />
      <section className="flex min-h-[600px] flex-col items-center justify-center gap-6 ">
        <div className="flex  items-center gap-4 ">
          <div
            className={` relative flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white after:absolute after:left-full after:h-1 after:w-1 after:bg-primary after:transition-all after:duration-2000 ${isOptionSelected ? "after:w-4" : "after:w-0"}
          `}
          >
            <p>1</p>
          </div>
        </div>
        {question ? (
          <article className=" mx-auto flex w-[90vw] max-w-5xl flex-col gap-6 rounded-2xl bg-red-400 p-4 shadow-2xl  md:px-20 md:py-10 ">
            <div>
              <div className="flex gap-2 ">
                <p className="text-xl text-white "> {quizIndex + 1} </p>
                <p className="text-xl text-white">{question.question}</p>
              </div>
              <div className="mx-auto mt-4 flex w-4/5 flex-col gap-4">
                {options.map((option, index) => (
                  <button
                    key={index}
                    className="bg-red-200 hover:bg-red-300 hover:shadow-md "
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-between ">
              <button
                className="bg-red-200 disabled:opacity-35"
                onClick={() => handleNextQuestion(-1)}
                disabled={quizIndex === 0}
              >
                Previous
              </button>
              <button
                className="bg-red-200 disabled:opacity-35 "
                onClick={() => handleNextQuestion(1)}
                disabled={quizIndex + 1 === quiz.length}
              >
                Next
              </button>
            </div>
          </article>
        ) : (
          <article className=" mx-auto flex w-[90vw] max-w-5xl flex-col gap-6 rounded-2xl bg-red-400 p-4 shadow-2xl  md:px-20 md:py-10 ">
            <Loader2 className="animate-spin" />
          </article>
        )}
      </section>
    </div>
  );
}
