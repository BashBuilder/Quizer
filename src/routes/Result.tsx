import { useQuizContext } from "@/hooks/quizContext";
import { useNavigate } from "react-router-dom";

export default function Result() {
  const { result, submitQuiz } = useQuizContext();
  const navigate = useNavigate();

  const handleAnotherQuiz = () => {
    navigate("/quiz");
    submitQuiz();
  };
  return (
    <div>
      <section className="h-[80%] min-h-[600px] px-10 pt-4 md:grid md:grid-cols-12  md:px-20 md:py-8 ">
        <div className=" col-span-6 mx-auto flex h-full min-h-[500px] flex-col  justify-center gap-10  md:items-start ">
          <img
            src="assets/svg/slider.svg"
            alt="result.png"
            className="mx-auto my-4 max-w-96 md:hidden"
          />
          {/* <h1 className="text-slate-700">Weldone</h1> */}
          <h3 className="text-center md:text-left">Your Quiz Performance:</h3>
          <h4 className="font-semibold text-slate-800">
            🎌 Category: <span>{result.questionsAnswered[0].category}</span>
          </h4>
          <h4 className="font-semibold text-slate-800">
            🌟 Score: <span>{result.score}</span>
          </h4>
          <h4 className="font-semibold text-slate-800">
            🏆 Attempted Questions: <span>{result.answers.length}</span>
          </h4>
          <h4 className="font-semibold text-slate-800">
            📚ToTal Questions : <span>{result.questionsAnswered.length}</span>
          </h4>
          <p className="text-xl">
            Explore more quizzes on Quizzer to continue expanding your
            knowledge.
          </p>
          <div className="my-4 flex items-center justify-center gap-6">
            <button
              className="bg-primary font-semibold text-white"
              onClick={() => navigate("/answerQuiz")}
            >
              Review Questions
            </button>
            <button
              className="bg-primary font-semibold text-white"
              onClick={handleAnotherQuiz}
            >
              Take another Quiz
            </button>
          </div>
        </div>
        <div className="hidden min-h-full items-center justify-center md:col-span-6 md:flex md:text-left">
          <img src="assets/svg/slider.svg" alt="img" />
        </div>
      </section>
    </div>
  );
}
