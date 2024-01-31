import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useAuthContext } from "./authContext";
import { FormState, Quiz, QuizContextProps, Result } from "@/data/quizTypes";
import { initialQuizState, initialResultState } from "@/data/data";

const QuizContext = createContext<QuizContextProps | undefined>(undefined);

interface QuizProviderProps {
  children: ReactNode;
}

const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  const { user } = useAuthContext();
  const [quiz, setQuiz] = useState<Quiz[]>([initialQuizState]);
  const [result, setResult] = useState<Result>(initialResultState);

  const [formState, setFormState] = useState<FormState>({
    loading: false,
    error: "",
  });

  const getQuiz = async (
    amount: string | number,
    category: string,
    difficulty: string,
    type: string,
  ) => {
    try {
      setFormState({ error: "", loading: true });
      const quizData = { amount, category, difficulty, type };
      const response = await fetch(import.meta.env.VITE_LOGIN_GETQUIZ, {
        method: "POST",
        body: JSON.stringify(quizData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      console.log(data.results);
      if (!response.ok) {
        if (
          data.error.includes(
            "getaddrinfo ENOTFOUND ac-am0iexc-shard-00-00.hd8622b.mongodb.net",
          )
        ) {
          setFormState((prev) => ({
            ...prev,
            error: "Please check your connection",
          }));
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setFormState((prev) => ({ ...prev, error: data.error }));
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setQuiz(data.results);
      localStorage.setItem("quizerQuiz", JSON.stringify(data.results));
    } catch (error) {
      console.error(error);
    } finally {
      setFormState((prev) => ({ ...prev, loading: false }));
    }
  };

  const setOptions = (number: number, answer: string) =>
    setResult((prev) => ({
      ...prev,
      answers: [...prev.answers, { number, answer }],
    }));

  useEffect(() => {
    const quizJson = localStorage.getItem("quizerQuiz");
    if (quizJson) {
      setQuiz(JSON.parse(quizJson)); // Parse and set the object to the quiz state
    }
  }, []);

  const contextValue: QuizContextProps = {
    quiz,
    getQuiz,
    formState,
    result,
    setOptions,
  };

  return (
    <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
  );
};

// eslint-disable-next-line
export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuizContext must be used within an QuizProvider");
  }
  return context;
};

export { QuizContext, QuizProvider };
