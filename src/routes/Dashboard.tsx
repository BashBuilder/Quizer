import { DatbaseQuizType } from "@/data/quizTypes";
import { useQuizContext } from "@/hooks/quizContext";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const { databaseQuiz, isFetchingDbQuiz, handleRetakeQuiz, formState } =
    useQuizContext();
  const [newQuiz, setNewQuiz] = useState<DatbaseQuizType[]>([]);
  const [startingPageNumber, setStartingPageNumber] = useState(0);
  const [endPageNumber, setEndPageNumber] = useState(4);

  const handleRetake = (_id: string) => {
    handleRetakeQuiz(_id);
    !formState.loading && navigate("/answerQuiz");
  };

  const handleNextPage = (num: number) => {
    setEndPageNumber((prev) => (prev += num));
    setStartingPageNumber((prev) => (prev += num));
  };

  useEffect(() => {
    setNewQuiz(databaseQuiz.slice(startingPageNumber, endPageNumber));
  }, [databaseQuiz, startingPageNumber, endPageNumber]);

  return (
    <section className="  gap-2  pt-10 md:grid md:grid-cols-12 md:px-10 md:py-8 ">
      <div className="col-span-7 h-full min-h-[500px] flex-col justify-center gap-10 md:flex ">
        {isFetchingDbQuiz ? (
          <div className="mx-auto  flex h-full min-h-[500px] w-fit items-center justify-center">
            <div className=" rounded-md bg-primary p-4 ">
              <Loader2 className="mx-auto  animate-spin text-white " />
            </div>
          </div>
        ) : databaseQuiz.length === 0 ? (
          <div className=" flex flex-col justify-center gap-10 md:flex">
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
          <div className=" flex flex-col justify-center gap-10 md:flex">
            <h2 className="text-slate-800">Previous Performances</h2>
            {newQuiz?.map((quiz, index) => (
              <div key={index} className="flex w-full flex-col gap-4">
                <div className="flex  justify-between gap-3">
                  <div className="flex gap-2">
                    <h4>{index + 1}.</h4>
                    <p
                      className="text-left text-2xl"
                      dangerouslySetInnerHTML={{ __html: quiz.category }}
                    />
                  </div>
                  <div className="flex justify-between gap-10">
                    <h4 className="t">
                      {(quiz.score / quiz.totalQuestions) * 100}%
                    </h4>
                    <button
                      className=" min-w-32 bg-primary font-semibold text-white "
                      onClick={() => handleRetake(quiz._id)}
                      disabled={formState.loading}
                    >
                      {formState.loading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Retake Quiz"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between">
              <button
                className="bg-orange-400 disabled:opacity-35"
                onClick={() => handleNextPage(-4)}
                disabled={startingPageNumber === 0}
              >
                Previous
              </button>
              {/* Add Pagination Here */}
              <button
                className="bg-orange-400 disabled:opacity-30"
                onClick={() => handleNextPage(4)}
                disabled={endPageNumber + 1 > databaseQuiz.length}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="hidden min-h-full items-center justify-center md:col-span-5 md:flex md:text-left ">
        {databaseQuiz.length === 0 ? (
          <img src="assets/sec.png" alt="" />
        ) : (
          <img src="assets/sec.png" alt="" />
        )}
      </div>
    </section>
  );
}
