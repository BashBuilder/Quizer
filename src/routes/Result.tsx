import Navbar from "@/components/Navbar";
import { useQuizContext } from "@/hooks/quizContext";
import { useNavigate } from "react-router-dom";

export default function Result() {
  const { result } = useQuizContext();
  const navigate = useNavigate();

  const handleNavigation = () => {
    console.log("handleNavigation");
  };
  return (
    <div>
      <Navbar />
      <section className="h-[80%] min-h-[600px] pt-4 md:grid md:grid-cols-12  md:px-10 md:py-8 ">
        <div className=" col-span-6 mx-auto flex h-full min-h-[500px] flex-col items-center justify-center gap-10  md:items-start ">
          <h1>Weldone</h1>
          <h3>Here is your performance</h3>
          <p>Score : {result.score} </p>
          <p>Attempted Questions {result.questionAttempts} </p>
          <p>ToTal Questions {result.questionsAnswered.length} </p>

          <div>
            <button className="bg-primary font-semibold text-white">
              Review Questions
            </button>
          </div>
          <div>
            <button
              className="bg-primary font-semibold text-white"
              onClick={() => navigate("/quiz")}
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
