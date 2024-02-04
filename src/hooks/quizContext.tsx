import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./authContext";
import {
  DatbaseQuizType,
  FormState,
  Quiz,
  QuizContextProps,
  QuizResultTypes,
  Result,
} from "@/data/quizTypes";
import { initialQuizState, initialResultState } from "@/data/data";
import { ProviderChildrenProps } from "@/data/authTypes";

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

  const getQuiz = async (
    amount: string | number,
    category: string,
    difficulty: string,
    type: string,
  ) => {
    try {
      setFormState({ error: "", loading: true });
      const quizData = { amount, category, difficulty, type };
      const response = await fetch(import.meta.env.VITE_USER_GETQUIZ, {
        method: "POST",
        body: JSON.stringify(quizData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        if (data.error.includes("getaddrinfo ENOTFOUND ac-am0iexc")) {
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
      if (data.results.length === 0) {
        setFormState((prev) => ({
          ...prev,
          error: "No Questions Available, try again",
        }));
        return;
      }
      const initialQuizResult: Result = {
        ...result,
        isubmitted: false,
        isQuizStarted: true,
        answers: [],
        correctAnswer: [],
        questionsAnswered: data.results,
      };
      setResult(initialQuizResult);
      localStorage.setItem("quizResults", JSON.stringify(initialQuizResult));
      localStorage.setItem("quizerQuiz", JSON.stringify(data.results));
    } catch (error) {
      console.error(error);
    } finally {
      setFormState((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleRetakeQuiz = (_id: string) => {
    setFormState({ error: "", loading: true });
    const retakeQuiz = databaseQuiz.filter((quiz) => quiz._id === _id)[0]
      .questions;
    setQuiz(retakeQuiz);
    const initialQuizResult: Result = {
      ...result,
      isubmitted: false,
      isQuizStarted: true,
      answers: [],
      correctAnswer: [],
      questionsAnswered: retakeQuiz,
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

  const submitQuiz = () => {
    // get all the answers from the questions
    if (!result.isubmitted) {
      setResult((prev) => ({ ...prev, isubmitted: true }));
      const correctAnswer = quiz.map((item, index) => ({
        number: index + 1,
        answer: item.correct_answer,
      }));
      const count = correctAnswer.reduce((acc, ans) => {
        const matchingAnswer = result.answers.find(
          (userAnswer) => userAnswer.number === ans.number,
        );
        if (matchingAnswer && ans.answer === matchingAnswer.answer) {
          return acc + 1;
        }
        return acc;
      }, 0);
      const submittedResult: Result = {
        ...result,
        score: count,
        isubmitted: true,
        isQuizStarted: false,
        correctAnswer,
      };
      setResult(submittedResult);
      localStorage.setItem("quizResults", JSON.stringify(submittedResult));
      postResult();
    } else {
      setResult((prev) => ({ ...prev, isubmitted: false }));
      setQuiz([initialQuizState]);
    }
  };

  const postResult = async () => {
    try {
      const quizResult: QuizResultTypes = {
        username: user.name,
        category: result.questionsAnswered[0].category,
        score: result.score,
        totalQuestions: result.questionsAnswered.length,
        questions: result.questionsAnswered,
      };
      const response = await fetch(import.meta.env.VITE_USER_SUBMITRESULTS, {
        method: "POST",
        body: JSON.stringify(quizResult),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAllQuestions = async () => {
    try {
      setIsFetchingDbQuiz(true);
      const username = { username: user.name };
      const response = await fetch(import.meta.env.VITE_USER_GETALLQUIZ, {
        method: "POST",
        body: JSON.stringify(username),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        setDatabaseQuiz([]);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setDatabaseQuiz(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchingDbQuiz(false);
    }
  };

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
