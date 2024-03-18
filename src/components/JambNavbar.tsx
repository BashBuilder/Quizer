import { useJambContext } from "@/hooks/jambContext";
import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import CountDownTimer from "./CountDownTimer";
import { useAuthContext } from "@/hooks/authContext";
import { User2Icon } from "lucide-react";

export default function JambNavbar() {
  const { pathname } = useLocation();
  const { questionStates } = useJambContext();
  const { user } = useAuthContext();
  const { isSubmitted } = questionStates;

  console.log(user);

  // const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-10 flex w-screen justify-between bg-green-600 px-10 pb-4 pt-2 shadow-sm ">
      {/* <JambSubmitModal
        isSubmitModalOpen={isSubmitModalOpen}
        setIsSubmitModalOpen={setIsSubmitModalOpen}
      /> */}
      <div>
        <img
          src="/assets/jamblogo.png"
          alt="jamblogo"
          className="w-1/5 min-w-16 max-w-16"
        />
      </div>
      {pathname === "/cbt/exam" && !isSubmitted ? (
        <div className="flex w-[90vw] items-center">
          <button
            // onClick={() => setIsSubmitModalOpen(true)}
            className="mx-auto rounded-md bg-white px-4 py-2 text-primary hover:opacity-80 "
          >
            Submit
          </button>
          <CountDownTimer />
        </div>
      ) : (
        <Fragment>
          <ul className="max-w-smd flex w-2/5 items-center justify-between font-semibold text-white">
            <li className="relative transition-all after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:rounded-md after:bg-white after:duration-300 hover:text-slate-200 hover:after:w-full ">
              <Link to="/">Home</Link>
            </li>
            <li className="relative transition-all after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:rounded-md after:bg-white after:duration-300 hover:text-slate-200 hover:after:w-full ">
              <Link to="/cbt/dashboard">Dashboard</Link>
            </li>
            <li className="relative transition-all after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:rounded-md after:bg-white after:duration-300 hover:text-slate-200 hover:after:w-full ">
              <Link to="/cbt/examform">Exam</Link>
            </li>
          </ul>
          <button className="my-auto flex items-center gap-2 border-2 border-white text-white duration-300  hover:border-green-400  hover:bg-green-400 ">
            <User2Icon /> <span> {user.name}</span>
          </button>
        </Fragment>
      )}
    </nav>
  );
}
