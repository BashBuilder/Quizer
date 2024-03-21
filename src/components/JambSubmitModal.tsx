import { useAuthContext } from "@/hooks/authContext";
import { useJambContext } from "@/hooks/jambContext";
import { db } from "@/utils/config";
import { addDoc, collection } from "firebase/firestore";
import { Loader2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useState } from "react";

interface SubmitModalProps {
  isSubmitModalOpen: boolean;
  setIsSubmitModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function JambSubmitModal({
  isSubmitModalOpen,
  setIsSubmitModalOpen,
}: SubmitModalProps) {
  const navigate = useNavigate();
  const { questionStates, endExam, submitAnswer } = useJambContext();
  const { user } = useAuthContext();
  const [loadingState, setLoadingState] = useState(false);

  const { subjectScore, score } = questionStates;
  const { email } = user;

  const submitQuestions = async () => {
    try {
      setLoadingState(true);
      await endExam();
      await submitAnswer();
      const uploadData = { subjectScore, score, email };
      const userScore = collection(db, "userScore");
      await addDoc(userScore, uploadData);
      navigate("/jambresult");
      setIsSubmitModalOpen((prev) => !prev);
    } catch (error) {
      console.log("The submit error is : ", error);
      navigate("/jambresult");
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <article
      className={`fixed inset-0 z-50 flex  items-center justify-center overflow-hidden bg-slate-700 bg-opacity-50 transition-all duration-300 ${isSubmitModalOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
    >
      <div className="relative mx-auto flex min-h-96 w-[90vw]  max-w-3xl flex-col items-center justify-center gap-10 rounded-xl bg-background p-10 text-center">
        <button
          className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-background shadow-sm hover:opacity-90 hover:shadow-2xl "
          onClick={() => setIsSubmitModalOpen(false)}
        >
          <X className="font-bold text-red-600 " size={30} />
        </button>
        <h2>Are you sure you want to submit?</h2>
        <Button
          className="bg-green-600 hover:bg-green-500"
          onClick={submitQuestions}
        >
          {loadingState ? <Loader2 className="animate-spin" /> : "Submit"}
        </Button>
      </div>
    </article>
  );
}
