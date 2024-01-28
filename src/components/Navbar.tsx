import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-4 py-2">
      <div>
        <h2>Quizer</h2>
      </div>

      <div className="flex items-center justify-between gap-20">
        <ul className="flex gap-4">
          <li>
            <Link
              to="/"
              className=" relative px-4 py-2 font-semibold transition-all after:absolute after:-bottom-0 after:left-1/2 after:h-1 after:w-[0px] after:-translate-x-1/2  after:rounded-md after:bg-primary after:duration-300 hover:after:w-3/5"
            >
              How it works
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className=" relative px-4 py-2 font-semibold transition-all after:absolute after:-bottom-0 after:left-1/2 after:h-1 after:w-[0px] after:-translate-x-1/2  after:rounded-md after:bg-primary after:duration-300 hover:after:w-3/5"
            >
              About Us
            </Link>
          </li>
        </ul>

        <Link
          to="/"
          className="rounded-md border-2 border-primary px-6 py-2 font-semibold text-primary transition-colors duration-300 hover:bg-primary hover:text-white "
        >
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
