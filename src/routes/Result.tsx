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
      <section className="h-[80%] min-h-[600px] px-6 pt-4 md:grid md:grid-cols-12  md:px-10 md:py-8 ">
        <div className=" col-span-6 mx-auto flex h-full min-h-[500px] flex-col  justify-center gap-6  md:items-start ">
          {/* <h1 className="text-slate-700">Weldone</h1> */}
          <h3>Here is your performance</h3>
          <h4 className="text-slate-800">Score : {result.score} </h4>
          <h4 className="text-slate-800">
            Attempted Questions: {result.answers.length}
          </h4>
          <h4 className="text-slate-800">
            ToTal Questions : {result.questionsAnswered.length}
          </h4>
          <div className="flex gap-6">
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
          <img src="assets/sec.png" alt="img" />
        </div>
      </section>
    </div>
  );
}
