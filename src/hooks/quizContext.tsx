import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./authContext";
import { FormState, Quiz, QuizContextProps, Result } from "@/data/quizTypes";
import { initialQuizState, initialResultState } from "@/data/data";
import { ProviderChildrenProps } from "@/data/authTypes";

const QuizContext = createContext<QuizContextProps | undefined>(undefined);

const QuizProvider: React.FC<ProviderChildrenProps> = ({ children }) => {
  const { user } = useAuthContext();
  const [quiz, setQuiz] = useState<Quiz[]>([initialQuizState]);
  const [result, setResult] = useState<Result>(initialResultState);
  const [formState, setFormState] = useState<FormState>({
    loading: false,
    error: "",
  });
  const [isQuizLoading, setIsQuizLoading] = useState(true);

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
      data.results.length === 0 &&
        setFormState((prev) => ({
          ...prev,
          error: "No Questions Available, try again",
        }));
      setResult((prev) => ({
        ...prev,
        isubmitted: false,
        questionsAnswered: data.results,
      }));
      localStorage.setItem("quizerQuiz", JSON.stringify(data.results));
    } catch (error) {
      console.error(error);
    } finally {
      setFormState((prev) => ({ ...prev, loading: false }));
    }
  };

  const setOptions = (number: number, answer: string) => {
    setResult((prev) => {
      // Check if an answer with the same number already exists
      const existingAnswerIndex = prev.answers.findIndex(
        (item) => item.number === number,
      );
      if (existingAnswerIndex !== -1) {
        // If the answer with the same number exists, update it
        const updatedAnswers = [...prev.answers];
        updatedAnswers[existingAnswerIndex] = { number, answer };
        return { ...prev, answers: updatedAnswers };
      } else {
        // If the answer with the same number doesn't exist, add a new one
        return { ...prev, answers: [...prev.answers, { number, answer }] };
      }
    });
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
      setResult((prev) => ({
        ...prev,
        score: count,
        isubmitted: true,
        correctAnswer,
      }));
      postResult();
    } else {
      setResult((prev) => ({ ...prev, isubmitted: false }));
      setQuiz([initialQuizState]);
    }
  };

  const postResult = async () => {
    try {
      const quizResult: {
        category: string;
        score: number;
        totalQuestions: number;
        questions: Quiz[];
      } = {
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
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setIsQuizLoading(true);
    const quizJson = localStorage.getItem("quizerQuiz");
    if (quizJson) {
      setQuiz(JSON.parse(quizJson));
    }
    setIsQuizLoading(false);
  }, []);

  const contextValue: QuizContextProps = {
    quiz,
    getQuiz,
    formState,
    result,
    setOptions,
    submitQuiz,
    postResult,
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
