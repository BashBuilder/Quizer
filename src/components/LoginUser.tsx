import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Lock, Mail } from "lucide-react";
import { useAuthContext } from "../hooks/authContext";

interface LoginProps {
  isLogin: boolean;
}

export default function LoginUser({ isLogin }: LoginProps) {
  const { login, loginState } = useAuthContext();
  const { loading, error } = loginState;
  const loginSchema = z.object({
    email: z.string().min(1, { message: "Enter your email or username" }),
    password: z.string().min(1, { message: "Enter your password" }),
  });

  type LoginSchemaType = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(loginSchema) });

  const loginUser: SubmitHandler<LoginSchemaType> = (data) => {
    const { email, password } = data;
    login(email, password);
  };

  return (
    <form
      className={` relative flex flex-col items-center overflow-hidden px-4 pt-20 transition-all duration-500 ease-in-out  sm:px-0 md:justify-center md:pt-0 xl:px-16  ${
        isLogin
          ? " delay-500"
          : " pointer-events-none z-[1] opacity-0 delay-100 "
      } `}
      onSubmit={handleSubmit(loginUser)}
    >
      <h2 className=" pb-2 font-bold text-slate-700 ">Login</h2>

      {/* Email / Username container */}

      <div className="relative mb-8 mt-5 w-11/12 max-w-[23rem] ">
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
          className="absolute -left-2 -top-3 scale-[.8] text-lg text-primary transition-all  duration-200 ease-linear peer-placeholder-shown:left-2 peer-placeholder-shown:top-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-slate-600 peer-focus:-left-2 peer-focus:-top-3 peer-focus:scale-[.8] peer-focus:text-primary"
          htmlFor="loginEmail"
        >
          Email or Username
        </label>
        {errors.email && (
          <p className="absolute text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* password container */}

      <div className="relative mb-10 w-11/12 max-w-[23rem]">
        <Lock
          className="absolute right-4 top-4 text-primary transition-all duration-200 peer-placeholder-shown:text-slate-500  peer-focus:text-primary "
          size={20}
        />
        <input
          className={`peer mt-2 w-full border-b-[.015rem] border-b-primary bg-transparent pb-1 pl-2 pr-12 pt-2 text-lg leading-[1] text-[--slate-800]  outline-none placeholder:text-transparent ${errors.password ? "placeholder-shown:border-b-red-500 focus:border-b-red-500 " : "placeholder-shown:border-b-slate-600 focus:border-b-primary"} `}
          type="password"
          placeholder="Password"
          id="loginPassword"
          {...register("password")}
        />
        <Lock
          className="absolute right-4 top-4 text-primary transition-all duration-200 peer-placeholder-shown:text-slate-500  peer-focus:text-primary "
          size={20}
        />
        <label
          htmlFor="loginPassword"
          className="absolute -left-2 -top-3 scale-[.8] text-lg text-primary transition-all  duration-200 ease-linear peer-placeholder-shown:left-2 peer-placeholder-shown:top-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-slate-600 peer-focus:-left-2 peer-focus:-top-3 peer-focus:scale-[.8] peer-focus:text-primary"
        >
          Password
        </label>
        {errors.password && (
          <p className="absolute text-red-500">{errors.password.message}</p>
        )}
        {/* <h6 className="mt-8 cursor-pointer text-right font-bold text-slate-700 hover:underline ">
          Forgot password
        </h6> */}
      </div>
      {error && <p className="text-red-500"> {error} </p>}
      <div className="mt-4 flex items-center justify-center">
        <button className="bg-primary text-white" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : "Login"}
        </button>
      </div>
    </form>
  );
}
