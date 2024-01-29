import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between gap-4 px-2 py-4 shadow-xl md:px-16  ">
      <div>
        <h2>Quizer</h2>
      </div>

      <div className="flex  items-center gap-2 text-center md:justify-between md:gap-20">
        <ul className="flex gap-2 md:gap-4">
          <li>
            <Link
              to="/"
              className=" relative px-1 py-2 font-semibold text-slate-600 transition-all after:absolute after:-bottom-0 after:left-1/2 after:h-1 after:w-[0px] after:-translate-x-1/2  after:rounded-md after:bg-primary after:duration-300 hover:after:w-3/5 md:px-4 "
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

        <Link
          to="/auth"
          className="rounded-md border-2 border-primary px-6 py-2 font-semibold text-primary transition-colors duration-300 hover:bg-primary hover:text-white "
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
