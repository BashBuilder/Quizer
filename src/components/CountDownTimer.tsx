import { useJambContext } from "@/hooks/jambContext";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Calculator } from "lucide-react";
import ExamCalculator from "./ExamCalculator";
import { useNavigate } from "react-router-dom";

interface ExamTimer {
  seconds: number;
  minutes: number;
  hours: number;
}

export default function CounterDownTimer() {
  const [examTime, setExamTime] = useState<ExamTimer>({
    seconds: 0,
    minutes: 0,
    hours: 0,
  });
  const { timer, submitAnswer, endExam } = useJambContext();
  const [isCalculatorShown, setIsCalculatorShown] = useState(false);
  const { duration, isExamStarted } = timer;

  const navigate = useNavigate();

  const startTimer = () => {
    let examTime: { duration: number; isExamStarted: boolean } = {
      duration: 0,
      isExamStarted: true,
    };
    const endTime = new Date().getTime() + duration * 1000;
    const calculateTimeRemaining = () => {
      const currentTime = new Date().getTime();
      const timeRemaining = endTime - currentTime;
      if (timeRemaining <= 0) {
        submitAnswer();
        endExam();
        navigate("/Jambresult");
        clearInterval(countdown);
      } else {
        const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
        const seconds = Math.floor((timeRemaining / 1000) % 60);
        setExamTime((prevTime) => ({ ...prevTime, minutes, seconds, hours }));
        examTime = {
          duration: timeRemaining / 1000,
          isExamStarted: true,
        };
        localStorage.setItem("examTime", JSON.stringify(examTime));
      }
    };
    const countdown = setInterval(() => {
      calculateTimeRemaining();
    }, 1000);
  };

  useEffect(() => {
    if (isExamStarted) {
      startTimer();
    }
    // eslint-disable-next-line
  }, [isExamStarted]);

  return (
    <article className="flex items-center justify-end gap-1 md:right-[12%]">
      <ExamCalculator isCalculatorShown={isCalculatorShown} />

      <Button
        className="mr-5 "
        variant="outline"
        onClick={() => setIsCalculatorShown((shownState) => !shownState)}
      >
        <Calculator />
      </Button>
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-green-500 text-white">
        <h6>{examTime.hours}</h6>
      </div>
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-green-500 text-white">
        <h6>{examTime.minutes}</h6>
      </div>
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-green-500 text-white">
        <h6>{examTime.seconds}</h6>
      </div>
    </article>
  );
}
