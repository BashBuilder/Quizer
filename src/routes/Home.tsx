import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/authContext";

function Home() {
  const { isAuthenticated } = useAuthContext();
  const { state: auth } = isAuthenticated;

  return (
    <section className=" h-[90vh] min-h-[600px] items-center justify-items-center px-10 pt-12 md:grid md:h-[80vh] md:grid-cols-12 md:px-32 md:py-0 ">
      <div className="flex flex-col gap-6 md:col-span-6 md:text-left ">
        {auth ? (
          <div className="flex flex-col gap-8">
            <h1 className="capitalize leading-[3.5rem] tracking-wider text-orange-700 md:text-left ">
              Welcome Back
            </h1>
            <h5 className="font-semibold capitalize text-slate-700 ">
              Glad to see you again at Quizzer Ready for more quizzes and fun?
            </h5>
            <p className="text-lg font-semibold italic">What's New For You</p>
            <ul className="flex flex-col gap-2">
              <li>
                <p className="w-fit rounded-md bg-orange-50 px-4 py-2 font-semibold text-slate-800">
                  📈 Track Progress
                </p>
              </li>
              <li>
                <p className="w-fit rounded-md bg-orange-50 px-4 py-2 font-semibold text-slate-800">
                  🔍 Explore Categories
                </p>
              </li>
            </ul>
            <p className=" relative mx-auto pl-4 text-slate-700 before:absolute before:-left-0 before:mr-4 before:h-full before:w-1 before:rounded-md before:bg-primary md:mx-0 ">
              Let's Get Started
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <h1 className="capitalize leading-[3.5rem] tracking-wider text-orange-700 md:text-left ">
              Welcome to Quizzer
            </h1>
            <h5 className="capitalize text-slate-700 ">
              Unlock the Power of Knowledge with Our Engaging Quizzes
            </h5>
            <ul className="flex flex-col gap-2">
              <li>
                <p className="w-fit rounded-md bg-orange-50 px-4 py-2 font-semibold text-slate-800">
                  🧠 Brain-Boosting Quizzes
                </p>
              </li>
              <li>
                <p className="w-fit rounded-md bg-orange-50 px-4 py-2 font-semibold text-slate-800">
                  🌐 Diverse Categories
                </p>
              </li>
              <li>
                <p className="w-fit rounded-md bg-orange-50 px-4 py-2 font-semibold text-slate-800">
                  🎉 Fun for All Ages
                </p>
              </li>
              <li>
                <p className="w-fit rounded-md bg-orange-50 px-4 py-2 font-semibold text-slate-800">
                  🔒 Secure and User-Friendly
                </p>
              </li>
            </ul>

            <p className=" relative mx-auto pl-4 text-slate-700 before:absolute before:-left-0 before:mr-4 before:h-full before:w-1 before:rounded-md before:bg-primary md:mx-0 ">
              Want to take up some challenge?
            </p>
          </div>
        )}
        <div className="flex justify-center md:justify-start">
          <Link
            to={auth ? "/quiz" : "/auth"}
            className=" rounded-md bg-primary px-4 py-2 font-semibold text-white hover:opacity-90 hover:shadow-xl"
          >
            {auth ? "Take Quiz" : "Sign Up"}
          </Link>
        </div>
      </div>
      <div className="col-span-12 col-start-7 flex items-center justify-center">
        {auth ? (
          <img src="assets/sec.png" alt="welcome" className="w-full" />
        ) : (
          <img src="assets/homeIcon.png" alt="welcome" className="w-full" />
        )}
      </div>
    </section>
  );
}

export default Home;
