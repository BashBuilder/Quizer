import {
  ProviderChildrenProps,
  // User,
} from "@/data/authTypes";
import {
  GetAnswersProps,
  JambContextProps,
  QuestionStateTypes,
  Questions,
  Solution,
  SubjectScores,
} from "@/data/jambTypes";
import { db } from "@/utils/config";
import { collection, getDocs } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";

const JambContext = createContext<JambContextProps | undefined>(undefined);

const JambProvider: React.FC<ProviderChildrenProps> = ({ children }) => {
  const [allQuestions, setAllQuestions] = useState<Questions[] | null>([]);
  const [subjectQuestion, setSubjectQuestion] = useState<Questions | null>(
    null,
  );
  const [questionStates, setQuestionStates] = useState<QuestionStateTypes>({
    selectedOptions: [],
    answers: [],
    score: 0,
    subjectScore: [],
    isSubmitted: false,
    subjects: [],
    examStatus: false,
  });
  const [timer, setTimer] = useState<{
    duration: number;
    isExamStarted: boolean;
  }>({
    duration: 7200,
    isExamStarted: false,
  });

  const fetchQuestions = async (newSubjects: string[]) => {
    try {
      const token = "ALOC-caa562dfeb1a7de83a69";
      const firestoreQuestion = collection(db, "englishQuestions");
      const englishSnapshot = await getDocs(firestoreQuestion);
      let isLiteratureIncluded = false;

      // @ts-expect-error "englishQuestions has any types"
      const englishQeustion = [];

      englishSnapshot.forEach((doc) => englishQeustion.push(doc.data()));
      const englishData: Questions = {
        subject: "english",
        // @ts-expect-error "englishQuestions has any types"
        data: englishQeustion[0].data,
      };
      let literatureData: Questions = { subject: "literature", data: [] };
      const newQuestions = [];
      try {
        let url;
        for (const subject of newSubjects) {
          if (subject === "literature") {
            // eslint-disable-next-line
            const lit: any[] = [];
            isLiteratureIncluded = true;

            const firestoreQuestion = collection(db, "englishlit");
            const literatureSnapshot = await getDocs(firestoreQuestion);
            literatureSnapshot.forEach((doc) => lit.push(doc.data()));
            literatureData = {
              subject: "literature",
              data: lit[0].data,
            };
          } else {
            url = `https://questions.aloc.com.ng/api/v2/m/40?subject=${subject}&type=utme`;
            const response = await fetch(url, {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                AccessToken: token,
              },
              method: "GET",
            });
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            newQuestions.push({ subject: data.subject, data: data.data });
            console.log(newQuestions);
          }
        }
      } catch (error) {
        console.log(error);
      }

      let newCombinedQuestions = [];
      if (isLiteratureIncluded) {
        newCombinedQuestions = [englishData, literatureData, ...newQuestions];
      } else {
        newCombinedQuestions = [englishData, literatureData, ...newQuestions];
      }

      setAllQuestions(newCombinedQuestions);
      const EXAM_TIME: { duration: number; isExamStarted: boolean } = {
        duration: 7200,
        isExamStarted: true,
      };

      const startingQuestionState = {
        selectedOptions: [],
        answers: [],
        score: 0,
        subjectScore: [],
        isSubmitted: false,
        subjects: [],
        examStatus: true,
      };
      const startingAnswerState: GetAnswersProps = {
        questions: newCombinedQuestions,
        subjects: ["english", ...newSubjects],
        isSubmitted: false,
        selectedOptions: [],
      };

      setTimer(EXAM_TIME);
      setQuestionStates(startingQuestionState);
      getAnswers(startingAnswerState);
      localStorage.setItem(
        "questionStates",
        JSON.stringify(startingQuestionState),
      );
      localStorage.setItem("examTime", JSON.stringify(EXAM_TIME));
      localStorage.setItem(
        "allQuestions",
        JSON.stringify(newCombinedQuestions),
      );
      const submittedDetails = { isSubmitted: false, selectedOptions: "" };
      localStorage.setItem("examSubmitted", JSON.stringify(submittedDetails));
      setTimer({ isExamStarted: true, duration: 7200 });
    } catch (error) {
      console.error("This results from fetching the questions");
      console.error(error);
    }
  };

  const getAnswers = ({
    questions,
    subjects,
    isSubmitted,
    selectedOptions,
  }: GetAnswersProps) => {
    let ans: Solution[] = [];

    let opt: Solution[] = [];
    questions?.forEach((questions: Questions) => {
      const sub = questions.subject;
      questions?.data.forEach((item, index) => {
        ans = [...ans, { num: index + 1, subject: sub, answer: item.answer }];
        opt = [...opt, { num: index + 1, subject: sub, answer: "" }];
      });
    });
    if (isSubmitted) {
      setQuestionStates((prev) => ({
        ...prev,
        answers: ans,
        selectedOptions,
        subjects,
        isSubmitted,
      }));
    } else {
      setQuestionStates((prev) => ({
        ...prev,
        answers: ans,
        selectedOptions: opt,
        subjects,
        isSubmitted,
      }));
    }
  };

  const updateAnswers = ({
    num,
    subject,
    answer,
  }: {
    num: number;
    subject: string;
    answer: string;
  }) => {
    const optionIndex = questionStates.selectedOptions.findIndex(
      (opt) => opt.num === num && opt.subject === subject,
    );

    if (optionIndex !== -1) {
      const updatedOptions = [...questionStates.selectedOptions];
      updatedOptions[optionIndex] = { num, subject, answer };
      setQuestionStates((prev) => ({
        ...prev,
        selectedOptions: updatedOptions,
      }));
    }
    localStorage.setItem("questionStates", JSON.stringify(questionStates));
  };
  const submitAnswer = async () => {
    const submittedDetails = {
      isSubmitted: true,
      selectedOptions: questionStates.selectedOptions,
    };
    localStorage.setItem("examSubmitted", JSON.stringify(submittedDetails));

    const answers = questionStates.answers;
    const options = questionStates.selectedOptions;
    let score = 0;
    const subjectScores: { [subject: string]: number } = {};
    questionStates.subjects.forEach((subject) => {
      subjectScores[subject] = 0;
    });
    answers.forEach((answer, index) => {
      if (options[index].answer === answer.answer) {
        // eslint-disable-next-line
        if (subjectScores.hasOwnProperty(answer.subject)) {
          if (answer.subject === "english") {
            subjectScores[answer.subject] += 1.7;
          } else {
            subjectScores[answer.subject] += 2.5;
          }
        }
      }
    });
    const formattedSubjectScores: SubjectScores[] = Object.entries(
      subjectScores,
    ).map(([subject, score]) => ({ subject, score: Math.round(score) }));

    score = formattedSubjectScores.reduce(
      (acc, subject) => acc + subject.score,
      0,
    );

    setQuestionStates((prev) => ({
      ...prev,
      isSubmitted: true,
      score,
      subjectScore: formattedSubjectScores,
    }));
  };
  const endExam = () => {
    const examTime = {
      duration: 0,
      isExamStarted: false,
    };
    localStorage.setItem("examTime", JSON.stringify(examTime));
    setTimer({
      duration: examTime.duration,
      isExamStarted: examTime.isExamStarted,
    });
  };

  useEffect(() => {
    const allQuestionJson = localStorage.getItem("allQuestions");
    const examSubmittedJson = localStorage.getItem("examSubmitted");
    const questionStatesJson = localStorage.getItem("questionStates");
    const examSubmitted = examSubmittedJson && JSON.parse(examSubmittedJson);

    const timerJson = localStorage.getItem("examTime");
    timerJson && setTimer(JSON.parse(timerJson));

    if (allQuestionJson) {
      const allQuestionReload = JSON.parse(allQuestionJson);
      setAllQuestions(allQuestionReload);
      setSubjectQuestion(allQuestionReload[0]);
      setQuestionStates((prev) => ({
        ...prev,
        isSubmitted: examSubmitted.isSubmitted,
      }));

      const allSubjects: string[] = [];
      allQuestionReload.forEach((question: Questions) =>
        allSubjects.push(question.subject),
      );

      console.log(examSubmitted.isSubmitted);
      getAnswers({
        questions: allQuestionReload,
        subjects: allSubjects,
        isSubmitted: examSubmitted.isSubmitted,
        selectedOptions: examSubmitted.selectedOptions,
      });
      questionStatesJson && setQuestionStates(JSON.parse(questionStatesJson));
    }
    // eslint-disable-next-line
  }, []);

  const jambContextValue: JambContextProps = {
    allQuestions,
    questionStates,
    fetchQuestions,
    getAnswers,
    updateAnswers,
    submitAnswer,
    timer,
    subjectQuestion,
    endExam,
    setSubjectQuestion,
  };

  return (
    <JambContext.Provider value={jambContextValue}>
      {children}
    </JambContext.Provider>
  );
};

// eslint-disable-next-line
export const useJambContext = () => {
  const context = useContext(JambContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export { JambContext, JambProvider };
