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
  databaseResult: DatabaseResult | undefined;
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
  answers: {
    number: number;
    answer: string;
  }[];
  isubmitted: boolean;
  isSubmitting: boolean;
  isQuizStarted: boolean;
}

export interface QuizSubmitTypes {
  username: string;
  answers: {
    number: number;
    answer: string;
  }[];
  questions: Quiz[];
}

export interface DatbaseQuizType {
  _id: string;
  category: string;
  score: number;
  questions: Quiz[];
}
export interface DatabaseResult {
  category: string;
  score: number;
  attempts: number;
  TotalQuestions: number;
  correctAnswer: { number: number; answer: string }[];
}
