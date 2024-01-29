import { useState } from "react";
import LoginUser from "../components/LoginUser";
import SignupUser from "../components/SignupUser";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  console.log(isLogin);

  return (
    <section className="flex h-screen min-h-[690px] items-center justify-center ">
      <div className=" relative h-[500px] w-full max-w-4xl overflow-hidden rounded-3xl bg-red-100 md:w-11/12">
        <div
          className={`absolute top-1/2 h-[110%] w-full -translate-y-1/2  rounded-[10rem] bg-primary transition-all duration-1000 ease-in-out ${isLogin ? "-left-1/2" : "left-1/2"} `}
        />
        <div className="relative h-full">
          {/* Login */}
          <div
            className={`absolute left-0  grid h-full w-full grid-cols-2 ${isLogin ? "z-30" : "z-10"}  `}
          >
            <div
              className={`flex flex-col items-center justify-center gap-4 delay-500 ${isLogin ? "" : "pointer-events-none opacity-0  "} `}
            >
              <h1 className="text-white">Quizer</h1>
              <button
                className="border-2 border-white font-semibold text-white"
                onClick={() => setIsLogin(!isLogin)}
              >
                Sign Up
              </button>
            </div>
            <LoginUser isLogin={isLogin} />
          </div>
          {/* sign up */}
          <div className="relative z-20 grid h-full grid-cols-2 gap-10 ">
            <SignupUser isLogin={isLogin} />
            <div
              className={`flex flex-col items-center justify-center gap-4 delay-300 ${!isLogin ? "" : "pointer-events-none opacity-0"}`}
            >
              <h1 className="text-white">Quizer</h1>
              <button
                className="border-2 border-white font-semibold text-white"
                onClick={() => setIsLogin(!isLogin)}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
