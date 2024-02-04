import { Quiz, Result } from "./quizTypes";

export const quizCategories = {
  GeneralKnowledge: 9,
  Books: 10,
  Film: 11,
  Music: 13,
  VideoGames: 15,
  BoardGames: 16,
  Nature: 17,
  Computers: 18,
  Mathematics: 19,
  Mythology: 20,
  sports: 21,
  Geography: 22,
  history: 23,
  politics: 24,
  Art: 25,
  Animals: 27,
  Comics: 29,
  Animation: 32,
};
export const initialQuizState: Quiz = {
  type: "",
  difficulty: "",
  category: "",
  question: "",
  correct_answer: "",
  incorrect_answers: [""],
};
export const initialResultState: Result = {
  answers: [],
  isubmitted: true,
  isSubmitting: false,
  isQuizStarted: false,
};
