export interface QuizContextProps {
  quiz: Quiz[];
  getQuiz: (
    amount: string | number,
    category: string,
    difficulty: string,
    type: string,
  ) => void;
  formState: FormState;
  result: Result;
  setOptions: (number: number, answer: string) => void;
}
export interface FormState {
  error: string;
  loading: boolean;
}
export interface Quiz {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}
export interface Result {
  score: number;
  answers: {
    number: number;
    answer: string;
  }[];
  questionAttempts: number;
  questionsFailed: number;
  isubmitted: boolean;
  questionsAnswered: Quiz[];
}
