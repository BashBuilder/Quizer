import { useQuizContext } from "@/hooks/quizContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { databaseQuiz } = useQuizContext();

  console.log(databaseQuiz);

  return (
    <section className=" min-h-[600px] pt-10  md:grid md:grid-cols-12 md:px-10 md:py-8 ">
      <div className="col-span-8 h-full flex-col justify-center gap-10 md:flex ">
        {databaseQuiz.length === 0 ? (
          <div>
            <h2>No Previous Performance</h2>
            <p className=" relative mx-auto pl-4 text-slate-700 before:absolute before:-left-0 before:mr-4 before:h-full before:w-1 before:rounded-md before:bg-primary md:mx-0 ">
              Practise Some Questions
            </p>
            <div className="flex justify-center md:justify-start">
              <Link
                to="/quiz"
                className=" rounded-md bg-primary px-4 py-2 font-semibold text-white hover:opacity-90 hover:shadow-xl"
              >
                Take Quiz
              </Link>
            </div>
          </div>
        ) : (
          databaseQuiz.map((quiz, index) => (
            <div key={index}>
              <h2 className="text-slate-800">Previous Performances</h2>
              <div className="flex items-center gap-3">
                <h4>{index + 1}.</h4>
                <p className="text-3xl"></p>
                <h4 className="t"> Percentage 50% </h4>
                <button className="bg-primary font-semibold text-white">
                  Retake Quiz
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="hidden min-h-full items-center justify-center md:col-span-6 md:flex md:text-left "></div>
    </section>
  );
}
