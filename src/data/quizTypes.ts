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
  submitQuiz: () => void;
  databaseQuiz: DatbaseQuizType[];
  isFetchingDbQuiz: boolean;
  handleRetakeQuiz: (_id: string) => void;
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
  correctAnswer: {
    number: number;
    answer: string;
  }[];
  questionAttempts: number;
  questionsFailed: number;
  isubmitted: boolean;
  isQuizStarted: boolean;
  questionsAnswered: Quiz[];
}
export interface QuizResultTypes {
  category: string;
  score: number;
  totalQuestions: number;
  questions: Quiz[];
}

export interface DatbaseQuizType {
  _id: string;
  category: string;
  score: number;
  totalQuestions: number;
  questions: Quiz[];
}
