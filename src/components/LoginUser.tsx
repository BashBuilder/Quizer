import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Lock, Mail, Unlock } from "lucide-react";
import { useAuthContext } from "../hooks/authContext";
import { useState } from "react";
import { Button } from "./ui/button";
import { auth } from "@/utils/config";
import { sendPasswordResetEmail } from "firebase/auth";

interface LoginProps {
  isLogin: boolean;
}

export default function LoginUser({ isLogin }: LoginProps) {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isPasswordForgotten, setIsPasswordForgotten] = useState(false);
  const [forgottenEmail, setForgottenEmail] = useState({
    loading: false,
    error: "",
    email: "",
  });
  const { login, loginState } = useAuthContext();
  const { loading, error } = loginState;
  // zod schema for form
  const loginSchema = z.object({
    email: z
      .string()
      .min(1, { message: "Enter your email" })
      .email("Enter a valid email address"),
    password: z.string().min(1, { message: "Enter your password" }),
  });
  type LoginSchemaType = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(loginSchema) });

  const handleForgottenEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setForgottenEmail((prev) => ({ ...prev, email: event.target.value }));
  };

  const sendResetLink = async () => {
    try {
      setForgottenEmail((prev) => ({ ...prev, loading: true, error: "" }));
      await sendPasswordResetEmail(auth, forgottenEmail.email);
      alert(`A Reset Password link has been sent to ${forgottenEmail}`);
      setIsPasswordForgotten(false);
    } catch (error) {
      // @ts-expect-error "invalid error type"
      const message = error.message;
      if (message.includes("network")) {
        setForgottenEmail((prev) => ({ ...prev, error: "Check your network" }));
      } else if (message.includes("invalid")) {
        setForgottenEmail((prev) => ({ ...prev, error: "Invalid Email" }));
      } else {
        setForgottenEmail((prev) => ({ ...prev, error: message }));
      }
    } finally {
      setForgottenEmail((prev) => ({ ...prev, loading: false }));
    }
  };

  const loginUser: SubmitHandler<LoginSchemaType> = async (data) => {
    try {
      const { email, password } = data;
      await login(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className={` relative flex flex-col items-center overflow-hidden px-4 pt-20 transition-all duration-500  ease-in-out sm:px-0 md:justify-center md:pt-0 xl:px-16  ${
        isLogin
          ? " delay-500"
          : " pointer-events-none z-[1] opacity-0 delay-100 "
      } `}
      onSubmit={handleSubmit(loginUser)}
    >
      {!isPasswordForgotten ? (
        <div>
          <h2 className=" pb-2 text-center font-bold text-slate-700">Login</h2>
          {/* Email / Username container */}

          <div className="relative mb-8 mt-5  ">
            <input
              className={`peer mt-2 w-full border-b-[.015rem] border-b-primary bg-transparent pb-1 pl-2 pr-12 pt-2 text-lg leading-[1] text-[--slate-800]  outline-none placeholder:text-transparent ${errors.email ? "placeholder-shown:border-b-red-500 focus:border-b-red-500 " : "placeholder-shown:border-b-slate-600 focus:border-b-primary"} `}
              type="text"
              id="loginEmail"
              placeholder="Email"
              {...register("email")}
            />
            <Mail
              className="absolute right-4 top-4 text-primary transition-all duration-200 peer-placeholder-shown:text-slate-500  peer-focus:text-primary  "
              size={20}
            />
            <label
              className=" absolute -top-2 left-0 text-sm text-primary transition-all duration-200 ease-linear  peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-placeholder-shown:text-slate-600  peer-focus:-top-2 peer-focus:text-sm peer-focus:text-primary"
              htmlFor="loginEmail"
            >
              Email
            </label>
            {errors.email && (
              <p className="absolute text-red-500">{errors.email.message}</p>
            )}
          </div>
          {/* password container */}

          <div className="relative mb-10 ">
            <input
              className={`peer mt-2 w-full border-b-[.015rem] border-b-primary bg-transparent pb-1 pl-2 pr-12 pt-2 text-lg leading-[1] text-[--slate-800]  outline-none placeholder:text-transparent ${errors.password ? "placeholder-shown:border-b-red-500 focus:border-b-red-500 " : "placeholder-shown:border-b-slate-600 focus:border-b-primary"} `}
              type={isPasswordShown ? "text" : "password"}
              placeholder="Password"
              id="loginPassword"
              {...register("password")}
            />
            {isPasswordShown ? (
              <button
                type="button"
                className="absolute right-0 top-3  text-primary  transition-all  duration-200 hover:shadow-none peer-placeholder-shown:text-slate-500 peer-focus:text-primary "
                onClick={() => setIsPasswordShown((prev) => !prev)}
              >
                <Unlock size={20} />
              </button>
            ) : (
              <button
                type="button"
                className="absolute right-0 top-3  text-primary  transition-all  duration-200 hover:shadow-none peer-placeholder-shown:text-slate-500 peer-focus:text-primary "
                onClick={() => setIsPasswordShown((prev) => !prev)}
              >
                <Lock size={20} />
              </button>
            )}
            <label
              htmlFor="loginPassword"
              className=" absolute -top-2 left-0 text-sm text-primary transition-all duration-200 ease-linear  peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-placeholder-shown:text-slate-600  peer-focus:-top-2 peer-focus:text-sm peer-focus:text-primary"
            >
              Password
            </label>
            {errors.password && (
              <p className="absolute text-red-500">{errors.password.message}</p>
            )}
          </div>
          {error && <p className="text-red-500"> {error} </p>}
          <div className="mt-4 flex items-center justify-center">
            <button className="bg-primary text-white" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : "Login"}
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <p>Forgotten Password?</p>
            <Button
              variant="link"
              type="button"
              className="hover:shadow-none"
              onClick={() => setIsPasswordForgotten((prev) => !prev)}
            >
              Click here
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex max-w-[23rem] flex-col ">
          <h2 className=" pb-2 text-center font-semibold text-slate-700">
            Enter Your Email Address
          </h2>

          <div className="relative mb-8 mt-5 ">
            <input
              className={`peer mt-2 w-full border-b-[.015rem] border-b-primary bg-transparent pb-1 pl-2 pr-12 pt-2 text-lg leading-[1] text-[--slate-800]  outline-none placeholder:text-transparent ${errors.email ? "placeholder-shown:border-b-red-500 focus:border-b-red-500 " : "placeholder-shown:border-b-slate-600 focus:border-b-primary"} `}
              type="text"
              id="loginEmail"
              placeholder="Email"
              value={forgottenEmail.email}
              onChange={(event) => handleForgottenEmailChange(event)}
            />
            <Mail
              className="absolute right-4 top-4 text-primary transition-all duration-200 peer-placeholder-shown:text-slate-500  peer-focus:text-primary  "
              size={20}
            />
            <label
              className=" absolute -top-2 left-0 text-sm text-primary transition-all duration-200 ease-linear  peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-placeholder-shown:text-slate-600  peer-focus:-top-2 peer-focus:text-sm peer-focus:text-primary"
              htmlFor="loginEmail"
            >
              Email
            </label>
          </div>
          {forgottenEmail.error && (
            <p className="text-center text-red-500"> {forgottenEmail.error} </p>
          )}
          <Button type="button" onClick={sendResetLink} className="mt-4">
            {forgottenEmail.loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Send Reset Link"
            )}
          </Button>
          <div className="mt-8 flex items-center justify-between ">
            <p>Remember Your password?</p>
            <Button
              variant="link"
              type="button"
              className="hover:shadow-none"
              onClick={() => setIsPasswordForgotten((prev) => !prev)}
            >
              Click here
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}
