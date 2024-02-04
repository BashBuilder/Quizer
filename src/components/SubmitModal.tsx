import { useQuizContext } from "@/hooks/quizContext";
import { Loader2, X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ModalPropsType {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function SubmitModal({
  isModalOpen,
  setIsModalOpen,
}: ModalPropsType) {
  const { submitQuiz, databaseResult, formState } = useQuizContext();
  const navigate = useNavigate();

  const { loading } = formState;

  const handleSubmitQuiz = () => {
    submitQuiz();
  };

  useEffect(() => {
    if (!loading && databaseResult) {
      navigate("/results");
      setIsModalOpen(false);
    }
    // eslint-disable-next-line
  }, [loading, databaseResult]);

  return (
    <div
      className={`absolute top-0 z-10 flex h-screen w-full items-center justify-center overflow-hidden  bg-orange-200 bg-opacity-20 transition-all duration-500 md:h-full ${isModalOpen ? "max-w-[100%]" : "max-w-0"} `}
    >
      <article className="relative flex h-[30rem] w-[90%] flex-col items-center justify-center gap-10 rounded-3xl bg-orange-400 p-8  md:h-3/5 md:w-3/5">
        <button
          className="absolute right-10 top-10 rounded-xl bg-orange-900 p-1"
          onClick={() => setIsModalOpen(false)}
        >
          <X className="text-white" />
        </button>
        <h2 className="text-center text-white">
          Are you sure you want to Submit
        </h2>
        <button className="bg-slate-800 text-white" onClick={handleSubmitQuiz}>
          {loading ? <Loader2 className="animate-spin" /> : "Submit"}
        </button>
      </article>
    </div>
  );
}
