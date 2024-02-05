import { useAuthContext } from "@/hooks/authContext";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function HomeLanding() {
  const { isAuthenticated } = useAuthContext();
  const { state: auth } = isAuthenticated;

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 3000,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <section className="min-h-[600px] py-6  ">
      <div
        className="flex flex-col gap-6 md:col-span-6 md:text-left"
        data-aos="fade-right"
      >
        {auth ? (
          <div className="flex flex-col gap-8">
            <h1 className="guerri text-5xl tracking-tighter text-orange-600 md:text-left ">
              Welcome Back
            </h1>
            <h5 className="font-medium capitalize text-slate-700 ">
              Glad to see you again at Quizzer Ready for more quizzes and fun?
            </h5>
            <p className="text-lg font-semibold italic text-slate-700">
              What's New For You
            </p>
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
            <h1 className="guerri text-5xl tracking-tighter text-orange-600 md:text-left ">
              Welcome to Quizer
            </h1>
            <h5 className="font-medium capitalize  text-slate-500 ">
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
      <div
        className="col-span-6 flex w-full items-center justify-center py-8"
        data-aos="fade-left"
      >
        {auth ? (
          <img src="assets/svg/question.svg" alt="welcome" />
        ) : (
          <img src="assets/svg/home.svg" alt="welcome" className="w-4/5" />
        )}
      </div>
    </section>
  );
}
