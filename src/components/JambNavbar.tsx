import { useJambContext } from "@/hooks/jambContext";
import { Fragment, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CountDownTimer from "./CountDownTimer";
import { useAuthContext } from "@/hooks/authContext";
import { User2Icon } from "lucide-react";
import JambSubmitModal from "./JambSubmitModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function JambNavbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { questionStates } = useJambContext();
  const { user } = useAuthContext();
  const { isSubmitted } = questionStates;

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  const handleDropdownClick = (num: number) => {
    switch (num) {
      case 1:
        navigate("/");
        break;
      case 2:
        navigate("/jambdashboard");
        break;
      case 3:
        navigate("/jambform");
        break;
    }
  };

  return (
    <nav className="fixed top-0 z-10 flex w-screen justify-between bg-green-600 px-4 pb-4 pt-2 shadow-sm md:px-10 ">
      <JambSubmitModal
        isSubmitModalOpen={isSubmitModalOpen}
        setIsSubmitModalOpen={setIsSubmitModalOpen}
      />
      <div>
        <img
          src="/assets/jamblogo.png"
          alt="jamblogo"
          className="w-1/5 min-w-16 max-w-16"
        />
      </div>
      {pathname.includes("exam") && !isSubmitted ? (
        <div className="flex w-[90vw] items-center">
          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="mx-auto rounded-md bg-white px-4 py-2 text-green-600 hover:opacity-80 "
          >
            Submit
          </button>
          <CountDownTimer />
        </div>
      ) : (
        <Fragment>
          <ul className="hidden w-2/5 max-w-sm items-center justify-between font-semibold text-white md:flex">
            <li className="relative transition-all after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:rounded-md after:bg-white after:duration-300 hover:text-slate-200 hover:after:w-full ">
              <Link to="/">Home</Link>
            </li>
            <li className="relative transition-all after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:rounded-md after:bg-white after:duration-300 hover:text-slate-200 hover:after:w-full ">
              <Link to="/jambdashboard">Dashboard</Link>
            </li>
            <li className="relative transition-all after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:rounded-md after:bg-white after:duration-300 hover:text-slate-200 hover:after:w-full ">
              <Link to="/jambform">Exam</Link>
            </li>
          </ul>
          <div className="flex items-center gap-2 md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger className=" border-2 border-white font-semibold text-white outline-none hover:shadow-none md:border-none md:px-0">
                {user.name}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="md:hidden">
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="my-2"
                  onClick={() => handleDropdownClick(1)}
                >
                  Home
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="my-2"
                  onClick={() => handleDropdownClick(2)}
                >
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="my-2"
                  onClick={() => handleDropdownClick(3)}
                >
                  Exam
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <button className="my-auto hidden items-center gap-2 border-2 border-white text-white duration-300 hover:border-green-400  hover:bg-green-400 md:flex ">
            <User2Icon /> <span> {user.name}</span>
          </button>
        </Fragment>
      )}
    </nav>
  );
}
