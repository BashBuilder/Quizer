import { useQuizContext } from "@/hooks/quizContext";
import { useNavigate } from "react-router-dom";

export default function Result() {
  const { submitQuiz, databaseResult } = useQuizContext();
  const navigate = useNavigate();

  const handleAnotherQuiz = () => {
    navigate("/quiz");
    submitQuiz();
  };
  return (
    <div>
      <section className="h-[80%] min-h-[600px] py-4">
        {databaseResult ? (
          <div className=" order-2 col-span-6 mx-auto flex h-full min-h-[500px] w-full flex-col justify-center  gap-8  md:order-1 md:items-start">
            <h3 className="text-center md:text-left">Your Quiz Performance:</h3>
            <p className="text-xl font-semibold text-slate-800 ">
              <span>{databaseResult.category}</span>
            </p>
            <p className="flex w-full items-center justify-between px-4 text-xl font-semibold text-slate-800 ">
              <span> 🌟 Score: </span>
              <span>{databaseResult.score}</span>
            </p>
            <p className="flex w-full items-center justify-between px-4 text-xl font-semibold text-slate-800 ">
              <span>🏆 Attempted Questions:</span>
              <span>{databaseResult.attempts}</span>
            </p>
            <p className="flex w-full items-center justify-between px-4 text-xl font-semibold text-slate-800 ">
              <span>📚ToTal Questions : </span>
              <span>{databaseResult.TotalQuestions}</span>
            </p>
            <p className="text-xl">
              Explore more quizzes on Quizzer to continue expanding your
              knowledge.
            </p>
            <div className="my-4 flex items-center justify-center gap-6">
              {/* <button
                className="bg-primary font-semibold text-white"
                onClick={() => navigate("/answerQuiz")}
              >
                Review Questions
              </button> */}
              <button
                className="bg-primary font-semibold text-white"
                onClick={handleAnotherQuiz}
              >
                Take another Quiz
              </button>
            </div>
          </div>
        ) : (
          <div className="col-span-6 flex flex-col items-center justify-center gap-6">
            <h3 className="text-center">No result Available</h3>
            <p className="text-center text-xl">
              Explore more quizzes on Quizzer to continue expanding your
              knowledge.
            </p>
            <button
              className="bg-primary font-semibold text-white"
              onClick={() => navigate("/quiz")}
            >
              Take Quiz
            </button>
          </div>
        )}
        <div className=" order-1 flex items-center justify-center md:order-2 md:col-span-6 ">
          <img src="assets/result.png" alt="img" />
        </div>
      </section>
    </div>
  );
}
