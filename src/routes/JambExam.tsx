import { Button } from "@/components/ui/button";
import { Solution } from "@/data/jambTypes";
import { useJambContext } from "@/hooks/jambContext";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";

export default function JambExam() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState<string>("english");
  const {
    allQuestions,
    questionStates,
    subjectQuestion: questions,
    setSubjectQuestion: setQuestions,
    updateAnswers,
  } = useJambContext();

  const { answers, selectedOptions, isSubmitted } = questionStates;

  //defining some navigation methods
  const handleNextQuestion = (num: number) =>
    setQuestionIndex((prevIndex) => prevIndex + num);
  const handleRandomQuestion = (index: number) => setQuestionIndex(index);

  // switch between questions
  useEffect(() => {
    const newQuestions = allQuestions?.filter(
      (questions) => questions.subject === selectedSubject,
    )[0];
    newQuestions && setQuestions(newQuestions);
    setQuestionIndex(0);

    // eslint-disable-next-line
  }, [selectedSubject]);

  if (questions && allQuestions) {
    const selectedColor = "bg-slate-700 text-white";
    const correctColor = "bg-green-500 text-white";
    const wrongColor = "bg-red-500 text-white";

    const currentNum: number = questionIndex + 1;
    const { subject } = questions;

    let q;
    let currentQuestion;
    for (let i = 0; i < questions.data.length; i++) {
      if (questions.data[i].questionNub == currentNum) q = questions.data[i];
    }

    if (q && subject === "english") {
      currentQuestion = q;
    } else {
      currentQuestion = questions.data[questionIndex];
    }
    const { option, question, image: questionImage } = currentQuestion;

    const options: Solution[] = selectedOptions.filter(
      (option) => option.subject === subject,
    );
    const subjectAnswers: Solution[] = answers.filter(
      (answer) => answer.subject === subject,
    );
    const currentOption = options.filter(
      (option) => option.num === currentNum,
    )[0].answer;
    const currentAnswer = subjectAnswers.filter(
      (answer) => answer.num === currentNum,
    )[0].answer;

    return (
      <div className="bg-green-100">
        <section className=" flex flex-col gap-4 ">
          {/* the subject panel */}
          <div className="mx-auto flex w-[90vw] max-w-5xl flex-col ">
            <div className="mb-4 flex flex-wrap gap-2 ">
              {allQuestions.map((question, index) => (
                <Button
                  key={index}
                  className={` rounded-md font-semibold capitalize hover:shadow-lg ${question.subject === selectedSubject ? "bg-primary text-white" : "bg-background text-foreground"} `}
                  onClick={() => setSelectedSubject(question.subject)}
                >
                  {question.subject}
                </Button>
              ))}
            </div>
            {/* the top question section */}
            <div className=" mb-4 flex flex-col gap-4 rounded-xl bg-background p-4 shadow-xl md:mb-10 md:px-20 md:py-10  ">
              {questions.data.map((item, qIndex) => {
                return (
                  <article
                    key={qIndex}
                    className={` ${qIndex === questionIndex ? "flex flex-col gap-4" : "hidden"} `}
                  >
                    {currentQuestion.section && (
                      <p
                        className=" text-xl font-semibold first-letter:capitalize "
                        dangerouslySetInnerHTML={{
                          __html: currentQuestion.section,
                        }}
                      />
                    )}
                    <div className="flex  gap-1 ">
                      <p className="text-xl">{currentNum}.</p>
                      {question && (
                        <p
                          className="text-xl"
                          dangerouslySetInnerHTML={{ __html: question }}
                        />
                      )}
                      {questionImage && (
                        <img src={`${questionImage}`} alt="question image" />
                      )}
                    </div>
                    <div className="flex flex-col items-start gap-2">
                      {Object.keys(option).map((opt: string, index) => {
                        const isOptionSelected = currentOption === opt;
                        const isOptionCorrect =
                          currentAnswer === currentOption && isOptionSelected;
                        const isNonChosenCorrectAnswer = currentAnswer === opt;
                        return (
                          <button
                            key={index}
                            className={`hover: rounded-md px-4 py-2 text-left ${isSubmitted ? (isOptionCorrect ? correctColor : isNonChosenCorrectAnswer ? wrongColor : isOptionSelected && selectedColor) : isOptionSelected ? selectedColor : "bg-slate-50 hover:bg-slate-200"}`}
                            onClick={() =>
                              updateAnswers({
                                answer: opt,
                                num: qIndex + 1,
                                subject,
                              })
                            }
                            disabled={isSubmitted}
                          >
                            <span dangerouslySetInnerHTML={{ __html: opt }} />
                            <span className="pr-4">.</span>
                            <span
                              // @ts-expect-error "options has any type"
                              dangerouslySetInnerHTML={{ __html: option[opt] }}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </article>
                );
              })}
              {/* the next and previous button goes here */}
              <div className="my-6 flex justify-between">
                <Button
                  onClick={() => handleNextQuestion(-1)}
                  disabled={questionIndex === 0}
                  variant="secondary"
                >
                  Previous
                </Button>
                <Button
                  onClick={() => handleNextQuestion(1)}
                  disabled={questionIndex + 1 === questions.data.length}
                  variant="secondary"
                >
                  Next
                </Button>
              </div>
            </div>
            {/* the lower question navigation pane  */}
            <div className=" flex flex-wrap justify-center gap-4 rounded-xl bg-background px-4 py-4 shadow-xl md:p-10 md:px-8 ">
              {questions.data.map((num, index) => {
                const isCurrentQuestion = index + 1 === currentNum;
                const currentOpt = options.filter(
                  (option) => option.num === index + 1,
                )[0].answer;
                const currentAns = subjectAnswers.filter(
                  (answer) => answer.num === index + 1,
                )[0].answer;
                const isOptionSelected = options.filter(
                  (opt) => opt.num === index + 1,
                )[0].answer;
                const isOptionCorrect = currentOpt === currentAns;
                return (
                  <button
                    key={index}
                    className={`w-10 rounded-md px-0 py-2 text-center ${isSubmitted ? (isOptionCorrect ? correctColor : wrongColor) : isOptionSelected ? selectedColor : isCurrentQuestion ? "bg-slate-400 text-white" : "bg-slate-100"}`}
                    onClick={() => handleRandomQuestion(index)}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    );
  } else {
    return (
      <div className="flex min-h-96 items-center justify-center py-10 md:py-20 ">
        <button className="rounded-md bg-primary px-4 py-2 text-background ">
          <Loader2Icon className="animate-spin" />
        </button>
      </div>
    );
  }
}
