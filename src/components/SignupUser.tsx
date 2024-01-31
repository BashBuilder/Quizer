import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Lock, Mail, User2 } from "lucide-react";
import { useAuthContext } from "../hooks/authContext";

interface LoginProps {
  isLogin: boolean;
}

export default function SignupUser({ isLogin }: LoginProps) {
  const { signup, signupState } = useAuthContext();
  const { loading, error } = signupState;
  const loginSchema = z
    .object({
      username: z.string().min(1, { message: "Please fill a username" }),
      email: z.string().email({ message: "Enter a valid email" }),
      password: z.string().min(1, { message: "Enter your password" }),
      confirmPassword: z
        .string()
        .min(1, { message: "Kindly confirm your password" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password does not match",
      path: ["confirmPassword"],
    });

  type LoginSchemaType = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(loginSchema) });

  const signupUser: SubmitHandler<LoginSchemaType> = (data) => {
    console.log(data);
    signup(data.email, data.password, data.username);
  };
  return (
    <form
      className={` relative flex flex-col items-center justify-center overflow-hidden px-4 transition-all duration-500  ease-in-out xl:px-16  ${
        !isLogin
          ? " delay-500"
          : " pointer-events-none z-[1] opacity-0 delay-100 "
      } `}
      onSubmit={handleSubmit(signupUser)}
    >
      <h2 className=" pb-2 font-bold text-slate-700 ">Sign Up</h2>
      <div className="relative mb-6 mt-5 w-11/12 max-w-[23rem] ">
        <input
          className={`peer mt-2 w-full border-b-[.015rem] border-b-primary bg-transparent pb-1 pl-2 pr-12 pt-2 text-lg leading-[1] text-[--slate-800]  outline-none placeholder:text-transparent ${errors.email ? "placeholder-shown:border-b-red-500 focus:border-b-red-500 " : "placeholder-shown:border-b-slate-600 focus:border-b-primary"} `}
          type="text"
          id="signupUsername"
          placeholder="Email"
          {...register("username")}
        />
        <User2
          className="absolute right-4 top-4 text-primary transition-all duration-200 peer-placeholder-shown:text-slate-500  peer-focus:text-primary "
          size={20}
        />
        <label
          className="absolute -left-2 -top-3 scale-[.8] text-lg text-primary transition-all  duration-200 ease-linear peer-placeholder-shown:left-2 peer-placeholder-shown:top-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-slate-600 peer-focus:-left-2 peer-focus:-top-3 peer-focus:scale-[.8] peer-focus:text-primary"
          htmlFor="signupUsername"
        >
          Username
        </label>
      </div>
      <div className="relative mb-6 w-11/12 max-w-[23rem] ">
        <input
          className={`peer mt-2 w-full border-b-[.015rem] border-b-primary bg-transparent pb-1 pl-2 pr-12 pt-2 text-lg leading-[1] text-[--slate-800]  outline-none placeholder:text-transparent ${errors.email ? "placeholder-shown:border-b-red-500 focus:border-b-red-500 " : "placeholder-shown:border-b-slate-600 focus:border-b-primary"} `}
          type="text"
          id="signupEmail"
          placeholder="Email"
          {...register("email")}
        />
        <Mail
          className="absolute right-4 top-4 text-primary transition-all duration-200 peer-placeholder-shown:text-slate-500  peer-focus:text-primary "
          size={20}
        />
        <label
          className="absolute -left-2 -top-3 scale-[.8] text-lg text-primary transition-all  duration-200 ease-linear peer-placeholder-shown:left-2 peer-placeholder-shown:top-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-slate-600 peer-focus:-left-2 peer-focus:-top-3 peer-focus:scale-[.8] peer-focus:text-primary"
          htmlFor="signupEmail"
        >
          Email
        </label>
      </div>
      <div className="relative mb-6 w-11/12 max-w-[23rem]">
        <input
          className={`peer mt-2 w-full border-b-[.015rem] border-b-primary bg-transparent pb-1 pl-2 pr-12 pt-2 text-lg leading-[1] text-[--slate-800]  outline-none placeholder:text-transparent ${errors.password ? "placeholder-shown:border-b-red-500 focus:border-b-red-500 " : "placeholder-shown:border-b-slate-600 focus:border-b-primary"} `}
          type="password"
          placeholder="Password"
          id="signupPassword"
          {...register("password")}
        />
        <Lock
          className="absolute right-4 top-4 text-primary transition-all duration-200 peer-placeholder-shown:text-slate-500  peer-focus:text-primary "
          size={20}
        />
        <label
          htmlFor="signupPassword"
          className="absolute -left-2 -top-3 scale-[.8] text-lg text-primary transition-all  duration-200 ease-linear peer-placeholder-shown:left-2 peer-placeholder-shown:top-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-slate-600 peer-focus:-left-2 peer-focus:-top-3 peer-focus:scale-[.8] peer-focus:text-primary"
        >
          Password
        </label>
      </div>
      <div className="relative mb-6 w-11/12 max-w-[23rem]">
        <input
          className={`peer mt-2 w-full border-b-[.015rem] border-b-primary bg-transparent pb-1 pl-2 pr-12 pt-2 text-lg leading-[1] text-[--slate-800]  outline-none placeholder:text-transparent ${errors.password ? "placeholder-shown:border-b-red-500 focus:border-b-red-500 " : "placeholder-shown:border-b-slate-600 focus:border-b-primary"} `}
          type="password"
          placeholder="Password"
          id="confirmPassword"
          {...register("confirmPassword")}
        />
        <Lock
          className="absolute right-4 top-4 text-primary transition-all duration-200 peer-placeholder-shown:text-slate-500  peer-focus:text-primary "
          size={20}
        />
        <label
          htmlFor="confirmPassword"
          className="absolute -left-2 -top-3 scale-[.8] text-lg text-primary  transition-all duration-200 ease-linear peer-placeholder-shown:left-2 peer-placeholder-shown:top-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-slate-600 peer-focus:-left-2 peer-focus:-top-3 peer-focus:scale-[.8] peer-focus:text-primary "
        >
          Confirm Password
        </label>
      </div>
      {errors.email || errors.password || errors.username ? (
        <p className=" text-rose-500 ">
          {errors.email ? errors.email.message : "Kindly Fill all the forms"}
        </p>
      ) : (
        errors.confirmPassword && (
          <p className="text-red-500"> {errors.confirmPassword.message} </p>
        )
      )}
      <div className="flex flex-col items-center justify-center">
        {error && <p className="text-red-500">{error}</p>}
        <button className="mt-2 bg-primary text-white ">
          {loading ? <Loader2 className="animate-spin" /> : "Sign Up"}
        </button>
      </div>
    </form>
  );
}