export interface JambContextProps {
  allQuestions: Questions[] | null;
  questionStates: QuestionStateTypes;
  fetchQuestions: (subjects: string[]) => void;
  getAnswers: ({
    questions,
    subjects,
    isSubmitted,
    selectedOptions,
  }: GetAnswersProps) => void;
  updateAnswers: ({
    num,
    subject,
    answer,
  }: {
    num: number;
    subject: string;
    answer: string;
  }) => void;
  submitAnswer: () => void;
  timer: {
    duration: number;
    isExamStarted: boolean;
  };
  subjectQuestion: Questions | null;
  setSubjectQuestion: React.Dispatch<React.SetStateAction<Questions | null>>;
  endExam: () => void;
}

export interface Questions {
  subject: string;
  data: QuestionData[];
}
export interface QuestionData {
  answer: string;
  examtype: string;
  examyear: string;
  id: number;
  image: string;
  option: QuestionOption;
  question: string | null;
  section: string;
  solution: string;
  questionNub: number;
  topic: string;
}
export interface QuestionOption {
  a: string;
  b: string;
  c: string;
  d: string;
  e?: string;
}

export interface Solution {
  num: number;
  subject: string;
  answer: string;
}
export interface SubjectScores {
  subject: string;
  score: number;
}
export interface QuestionStateTypes {
  selectedOptions: Solution[];
  answers: Solution[];
  score: number;
  subjectScore: SubjectScores[];
  isSubmitted: boolean;
  subjects: string[];
  examStatus: boolean;
}

export interface GetAnswersProps {
  questions: Questions[];
  subjects: string[];
  isSubmitted: boolean;
  selectedOptions: Solution[];
}
// export interface SubjectScores {
//   subject: string;
//   score: number;
// }
