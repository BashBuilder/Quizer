import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/authContext";

export default function Navbar() {
  const { isAuthenticated, user } = useAuthContext();
  const { name }: { name?: string } = user || {};

  return (
    <nav className="flex items-center justify-between gap-4 bg-background px-4 py-6 shadow-xl md:px-16  ">
      <div>
        <h2>Quizer</h2>
      </div>

      <div className="flex  items-center gap-2 text-center md:justify-between md:gap-20">
        {!isAuthenticated ? (
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
                to="/"
                className={` relative px-1 py-2 font-semibold text-slate-600 transition-all after:absolute after:-bottom-0 after:left-1/2 after:h-1 after:w-[0px] after:-translate-x-1/2  after:rounded-md after:bg-primary after:duration-300 hover:after:w-3/5 md:px-4 ${isAuthenticated ? "hidden md:inline " : "inline"} `}
              >
                How it works
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className=" relative hidden px-1 py-2 text-center font-semibold text-slate-600 transition-all after:absolute after:-bottom-0 after:left-1/2 after:h-1 after:w-[0px]  after:-translate-x-1/2 after:rounded-md after:bg-primary after:duration-300 hover:after:w-3/5 md:inline md:px-4 "
              >
                About Us
              </Link>
            </li>
          </ul>
        ) : (
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
                to="/dashboard"
                className={` relative px-1 py-2 font-semibold text-slate-600 transition-all after:absolute after:-bottom-0 after:left-1/2 after:h-1 after:w-[0px] after:-translate-x-1/2  after:rounded-md after:bg-primary after:duration-300 hover:after:w-3/5 md:px-4 ${isAuthenticated ? "hidden md:inline " : "inline"} `}
              >
                Dashboard
              </Link>
            </li>
          </ul>
        )}

        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            <h6>Hello</h6>
            <button className="flex items-center gap-1 border-[1px] border-primary text-primary hover:shadow-xl ">
              <svg width="16" height="16" viewBox="0 0 26 33">
                <path
                  d="M0.682597 27.9796C-0.446046 21.8498 3.92326 18.3172 6.49389 16.7082C1.37801 11.5609 3.71721 4.67861 6.49389 2.37838C9.72473 -0.298061 15.5078 -1.51387 19.2838 3.08405C23.9465 8.76179 21.2274 14.438 19.2838 16.7082C20.5378 17.8122 24.8486 20.6817 25.4807 26.58C26.2783 34.0218 2.0934 35.6419 0.682597 27.9796Z"
                  fill="#FD4C00"
                />
              </svg>
              <span> {name} </span>
              <svg width="10" viewBox="0 0 26 29" className="rotate-90">
                <path
                  d="M25.5 14.5L0.749999 28.7894L0.75 0.21058L25.5 14.5Z"
                  fill="#FD4C00"
                />
              </svg>
            </button>
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
