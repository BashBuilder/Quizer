import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./authContext";
import {
  DatabaseResult,
  DatbaseQuizType,
  FormState,
  Quiz,
  QuizContextProps,
  QuizSubmitTypes,
  Result,
} from "@/data/quizTypes";
import { initialQuizState, initialResultState } from "@/data/data";
import { ProviderChildrenProps } from "@/data/authTypes";
import { postData } from "@/lib/PostRequests";

const QuizContext = createContext<QuizContextProps | undefined>(undefined);

const QuizProvider: React.FC<ProviderChildrenProps> = ({ children }) => {
  const { user } = useAuthContext();
  const [quiz, setQuiz] = useState<Quiz[]>([initialQuizState]);
  const [result, setResult] = useState<Result>(initialResultState);
  const [databaseQuiz, setDatabaseQuiz] = useState<DatbaseQuizType[]>([]);
  const [formState, setFormState] = useState<FormState>({
    loading: false,
    error: "",
  });
  const [isQuizLoading, setIsQuizLoading] = useState(true);
  const [isFetchingDbQuiz, setIsFetchingDbQuiz] = useState(false);
  const [databaseResult, setDatabaseResult] = useState<DatabaseResult>();
  // Fetch the quiz from the api endpoint
  const getQuiz = async (
    amount: string | number,
    category: string,
    difficulty: string,
    type: string,
  ) => {
    try {
      setFormState({ error: "", loading: true });
      const quizData = { amount, category, difficulty, type };
      const data = await postData(
        import.meta.env.VITE_USER_GETQUIZ,
        quizData,
        user,
      );
      if (data.error) {
        setFormState((prev) => ({ ...prev, error: data.error }));
        throw new Error(`HTTP request error!`);
      }
      if (data.results.length === 0) {
        setFormState((prev) => ({
          ...prev,
          error: "No Questions Available, try again",
        }));
        return;
      }
      setQuiz(data.results);
      const initialQuizResult: Result = {
        ...initialResultState,
        isubmitted: false,
        isQuizStarted: true,
        answers: [],
      };

      setResult(initialQuizResult);
      setDatabaseResult(undefined);
      localStorage.setItem("quizResults", JSON.stringify(initialQuizResult));
      localStorage.setItem("quizerQuiz", JSON.stringify(data.results));
    } catch (error) {
      console.error(error);
    } finally {
      setFormState((prev) => ({ ...prev, loading: false }));
    }
  };

  // Take the quiz again
  const handleRetakeQuiz = (_id: string) => {
    setDatabaseResult(undefined);
    setFormState({ error: "", loading: true });
    const retakeQuiz = databaseQuiz.filter((quiz) => quiz._id === _id)[0]
      .questions;
    setQuiz(retakeQuiz);
    const initialQuizResult: Result = {
      ...result,
      isubmitted: false,
      isQuizStarted: true,
      answers: [],
    };
    setResult(initialQuizResult);
    localStorage.setItem("quizerQuiz", JSON.stringify(retakeQuiz));
    localStorage.setItem("quizResults", JSON.stringify(initialQuizResult));
    setFormState((prev) => ({ ...prev, loading: false }));
  };

  const setOptions = (number: number, answer: string) => {
    let currentResult: Result;
    // Check if an answer with the same number already exists
    const existingAnswerIndex = result.answers.findIndex(
      (item) => item.number === number,
    );
    if (existingAnswerIndex !== -1) {
      // If the answer with the same number exists, update it
      const updatedAnswers = [...result.answers];
      updatedAnswers[existingAnswerIndex] = { number, answer };
      currentResult = { ...result, answers: updatedAnswers };
      setResult(currentResult);
      localStorage.setItem("quizResults", JSON.stringify(currentResult));
    } else {
      // If the answer with the same number doesn't exist, add a new one
      currentResult = {
        ...result,
        answers: [...result.answers, { number, answer }],
      };
      setResult(currentResult);
      localStorage.setItem("quizResults", JSON.stringify(currentResult));
    }
  };

  const submitQuiz = async () => {
    try {
      setFormState({ error: "", loading: true });
      setResult((prev) => ({ ...prev, isSubmitting: true }));
      const submittedResult: Result = {
        ...result,
        isubmitted: true,
        isQuizStarted: false,
      };
      setResult(submittedResult);
      localStorage.setItem("quizResults", JSON.stringify(submittedResult));

      const quizResult: QuizSubmitTypes = {
        username: user.name,
        answers: result.answers,
        questions: quiz,
      };
      const data = await postData(
        import.meta.env.VITE_USER_SUBMITRESULTS,
        quizResult,
        user,
      );
      if (!data || data.error) {
        console.log(data.error);
        return;
      }
      setDatabaseResult(data);
    } catch (error) {
      console.log(error);
    } finally {
      setResult((prev) => ({ ...prev, isSubmitting: false }));
      setFormState((prev) => ({ ...prev, loading: false }));
    }
  };

  // get all user question from the database
  const getAllQuestions = async () => {
    try {
      setIsFetchingDbQuiz(true);
      const username = { username: user.name };
      const data = await postData(
        import.meta.env.VITE_USER_GETALLQUIZ,
        username,
        user,
      );
      if (!data || data.error) {
        setDatabaseQuiz([]);
        throw new Error(`HTTP fetch error!`);
      }
      setDatabaseQuiz(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchingDbQuiz(false);
    }
  };

  useEffect(() => {
    getAllQuestions();
    // eslint-disable-next-line
  }, [databaseResult]);

  // reload questions on page refresh
  useEffect(() => {
    setIsQuizLoading(true);
    const quizJson = localStorage.getItem("quizerQuiz");
    const resultJson = localStorage.getItem("quizResults");
    if (quizJson) {
      const localQuiz = JSON.parse(quizJson);
      setQuiz(localQuiz);
      setResult((prev) => ({
        ...prev,
        isubmitted: false,
        questionsAnswered: localQuiz,
      }));
    }
    if (resultJson) {
      const localResult = JSON.parse(resultJson);
      setResult(localResult);
    }
    getAllQuestions();
    setIsQuizLoading(false);
    // eslint-disable-next-line
  }, []);

  const contextValue: QuizContextProps = {
    quiz,
    getQuiz,
    formState,
    result,
    setOptions,
    submitQuiz,
    databaseQuiz,
    isFetchingDbQuiz,
    handleRetakeQuiz,
    databaseResult,
  };

  return (
    <QuizContext.Provider value={contextValue}>
      {!isQuizLoading && children}
    </QuizContext.Provider>
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
