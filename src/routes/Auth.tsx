import LoginUser from "../components/LoginUser";
import SignupUser from "../components/SignupUser";
import { useAuthContext } from "@/hooks/authContext";

export default function Login() {
  const { isLogin, changeLoginState } = useAuthContext();

  // const [isLogin, setIsLogin] = useState(true);
  return (
    <section className="h-screen items-center justify-center p-0 md:flex ">
      <div className=" relative h-screen min-h-[600px] w-full overflow-hidden md:h-[500px] md:w-11/12 md:max-w-4xl md:rounded-3xl md:bg-red-50">
        <div
          className={`absolute h-[110%] w-[150%] rounded-full bg-primary transition-all duration-1000  ease-in-out md:top-1/2 md:w-full md:-translate-y-1/2 md:rounded-[10rem] ${isLogin ? "bottom-[60%] md:-left-1/2 " : "-bottom-[70%] md:left-1/2"} `}
        />
        <div className="relative h-full">
          {/* Login */}
          <article
            className={`absolute left-0 grid h-full w-full md:grid-cols-2 ${isLogin ? "z-30" : "z-10"}  `}
          >
            <div
              className={`flex flex-col items-center justify-center gap-4 delay-500 ${isLogin ? "" : "pointer-events-none opacity-0 "} `}
            >
              <h1 className="text-white">Quizer</h1>
              <button
                className="border-2 border-white font-semibold text-white"
                onClick={changeLoginState}
              >
                Sign Up
              </button>
            </div>
            <LoginUser isLogin={isLogin} />
          </article>

          {/* sign up */}
          <article className="relative z-20 grid h-full md:grid-cols-2 ">
            <SignupaUser isLogin={isLogin} />
            <div
              className={`flex flex-col items-center gap-4 delay-300 md:justify-center ${!isLogin ? "" : "pointer-events-none opacity-0"}`}
            >
              <h1 className="text-white">Quizer</h1>
              <button
                className="border-2 border-white font-semibold text-white"
                onClick={changeLoginState}
              >
                Sign In
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
