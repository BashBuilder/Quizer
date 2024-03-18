import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/authContext";
import { useQuizContext } from "@/hooks/quizContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { useEffect } from "react";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuthContext();
  const { result, submitQuiz } = useQuizContext();
  const navigate = useNavigate();
  const { name }: { name?: string } = user || {};
  const { isQuizStarted } = result;
  const { state: auth } = isAuthenticated;
  const isAuthRoute = window.location.pathname === "/auth";
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/answerQuiz" && isQuizStarted) {
      submitQuiz();
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  const handleDropdownClick = (num: number) => {
    switch (num) {
      case 1:
        navigate("/");
        break;
      case 2:
        navigate("/quiz");
        break;
      case 3:
        navigate("/dashboard");
        break;
      case 4:
        logout();
        navigate("/");
        break;
    }
  };

  return (
    <nav
      className={` items-center justify-between gap-4 bg-background px-4 py-6 shadow-xl md:px-16   ${isQuizStarted || isAuthRoute || location.pathname.includes("jambexam") ? "hidden" : "flex"} `}
    >
      <div className="relative overflow-hidden ">
        <img
          src="assets/quizzer.png"
          alt="logo"
          className="absolute right-0 w-12"
        />
        <h2>Quizer</h2>
      </div>

      <div className="flex  items-center gap-2 text-center md:justify-between md:gap-20">
        {!auth ? (
          <ul className="flex gap-2 md:gap-4">
            <li>
              <Link
                to="/"
                className={` relative px-1 py-2 font-semibold text-slate-600 transition-all after:absolute after:-bottom-0 after:left-1/2 after:h-1 after:w-[0px] after:-translate-x-1/2  after:rounded-md after:bg-primary after:duration-300 hover:after:w-3/5 md:px-4 ${isAuthenticated ? "hidden md:inline " : "inline"} `}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/how"
                className={` relative px-1 py-2 font-semibold text-slate-600 transition-all after:absolute after:-bottom-0 after:left-1/2 after:h-1 after:w-[0px] after:-translate-x-1/2  after:rounded-md after:bg-primary after:duration-300 hover:after:w-3/5 md:px-4 ${isAuthenticated ? "hidden md:inline " : "inline"} `}
              >
                How it works
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className=" relative hidden px-1 py-2 text-center font-semibold text-slate-600 transition-all after:absolute after:-bottom-0 after:left-1/2 after:h-1 after:w-[0px]  after:-translate-x-1/2 after:rounded-md after:bg-primary after:duration-300 hover:after:w-3/5 md:inline md:px-4 "
              >
                About Us
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="flex items-center gap-2 md:gap-4">
            <li>
              <Link
                to="/"
                className={` relative hidden px-1 py-2 font-semibold text-slate-600 transition-all after:absolute after:-bottom-0 after:left-1/2 after:h-1 after:w-[0px]  after:-translate-x-1/2 after:rounded-md after:bg-primary after:duration-300 hover:after:w-3/5 md:inline md:px-4 `}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/quiz"
                className={` relative hidden px-1 py-2 font-semibold text-slate-600 transition-all after:absolute after:-bottom-0 after:left-1/2 after:h-1 after:w-[0px]  after:-translate-x-1/2 after:rounded-md after:bg-primary after:duration-300 hover:after:w-3/5 md:inline md:px-4`}
              >
                Quiz
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className={` relative hidden px-1 py-2 font-semibold text-slate-600 transition-all after:absolute after:-bottom-0 after:left-1/2 after:h-1 after:w-[0px]  after:-translate-x-1/2 after:rounded-md after:bg-primary after:duration-300 hover:after:w-3/5 md:inline md:px-4 `}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <button
                className={` relative hidden items-center gap-2 px-1 py-2 font-semibold text-slate-600 transition-all after:absolute after:-bottom-0 after:left-1/2  after:h-1 after:w-[0px] after:-translate-x-1/2 after:rounded-md after:bg-primary after:duration-300 hover:shadow-none hover:after:w-3/5 md:inline-flex md:px-4 `}
                onClick={() => handleDropdownClick(4)}
              >
                <span>Logout</span> <LogOut size={20} />
              </button>
            </li>
          </ul>
        )}

        {auth ? (
          <div className="flex items-center gap-2">
            <h6>Hello</h6>
            <DropdownMenu>
              <DropdownMenuTrigger className=" flex items-center gap-1 border-2 border-primary font-semibold text-primary outline-none hover:shadow-none md:border-none md:px-0">
                {name}
                <User className="text-primar " size={20} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="md:hidden">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
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
                  Quiz
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="my-2"
                  onClick={() => handleDropdownClick(3)}
                >
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="my-2"
                  onClick={() => handleDropdownClick(4)}
                >
                  Logout
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Link
            to="/auth"
            className="rounded-md border-2 border-primary px-6 py-2 font-semibold text-primary transition-colors duration-300 hover:bg-primary hover:text-white "
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
