import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Lock, Mail } from "lucide-react";

interface LoginProps {
  isLogin: boolean;
}

export default function SignupUser({ isLogin }: LoginProps) {
  const loginSchema = z
    .object({
      email: z.string().email({ message: "Enter a valid email" }),
      password: z.string().min(1, { message: "Enter your password" }),
      confirmPassword: z.string().min(1, { message: "Enter your password" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password does not match",
      path: ["confirmPassword"],
    });

  type LoginSchemaType = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(loginSchema) });

  const signupUser: SubmitHandler<LoginSchemaType> = (data) => {
    console.log(data);
  };
  return (
    <form
      className={` relative flex flex-col items-center justify-center overflow-hidden px-4 transition-all  duration-500 ease-in-out sm:px-0 md:px-8 xl:px-16  ${
        !isLogin
          ? " delay-500"
          : " pointer-events-none z-[1] opacity-0 delay-100 "
      } `}
      onSubmit={handleSubmit(signupUser)}
    >
      <h2 className=" pb-2 font-bold text-slate-700 ">Sign Up</h2>
      <div className="relative mb-6 mt-5 w-11/12 max-w-[23rem] ">
        <Mail className="absolute right-4 top-4 text-slate-500" size={20} />
        <input
          className={`peer mt-2 w-full border-b-[.015rem] border-b-primary bg-transparent pb-1 pl-2 pr-10 pt-2 text-lg leading-[1] text-[--slate-800]  outline-none placeholder:text-transparent ${errors.email ? "placeholder-shown:border-b-red-500 focus:border-b-red-500 " : "placeholder-shown:border-b-slate-600 focus:border-b-primary"} `}
          type="text"
          id="loginEmail"
          placeholder="Email"
          {...register("email")}
        />
        <label
          className="absolute -left-2 -top-3 scale-[.8] text-lg text-primary transition-all  duration-200 ease-linear peer-placeholder-shown:left-2 peer-placeholder-shown:top-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-slate-600 peer-focus:-left-2 peer-focus:-top-3 peer-focus:scale-[.8] peer-focus:text-primary"
          htmlFor="loginEmail"
        >
          Email
        </label>
      </div>
      <div className="relative mb-6 w-11/12 max-w-[23rem]">
        <Lock className="absolute right-4 top-4 text-slate-500" size={20} />
        <input
          className={`peer mt-2 w-full border-b-[.015rem] border-b-primary bg-transparent pb-1 pl-2 pr-10 pt-2 text-lg leading-[1] text-[--slate-800]  outline-none placeholder:text-transparent ${errors.password ? "placeholder-shown:border-b-red-500 focus:border-b-red-500 " : "placeholder-shown:border-b-slate-600 focus:border-b-primary"} `}
          type="password"
          placeholder="Password"
          id="loginPassword"
          {...register("password")}
        />
        <label
          htmlFor="loginPassword"
          className="absolute -left-2 -top-3 scale-[.8] text-lg text-primary transition-all  duration-200 ease-linear peer-placeholder-shown:left-2 peer-placeholder-shown:top-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-slate-600 peer-focus:-left-2 peer-focus:-top-3 peer-focus:scale-[.8] peer-focus:text-primary"
        >
          Password
        </label>
      </div>
      <div className="relative mb-6 w-11/12 max-w-[23rem]">
        <Lock className="absolute right-4 top-4 text-slate-500" size={20} />
        <input
          className={`peer mt-2 w-full border-b-[.015rem] border-b-primary bg-transparent pb-1 pl-2 pr-10 pt-2 text-lg leading-[1] text-[--slate-800]  outline-none placeholder:text-transparent ${errors.password ? "placeholder-shown:border-b-red-500 focus:border-b-red-500 " : "placeholder-shown:border-b-slate-600 focus:border-b-primary"} `}
          type="password"
          placeholder="Password"
          id="loginPassword"
          {...register("confirmPassword")}
        />
        <label
          htmlFor="loginPassword"
          className="absolute -left-2 -top-3 scale-[.8] text-lg text-primary  transition-all duration-200 ease-linear peer-placeholder-shown:left-2 peer-placeholder-shown:top-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-slate-600 peer-focus:-left-2 peer-focus:-top-3 peer-focus:scale-[.8] peer-focus:text-primary "
        >
          Confirm Password
        </label>
      </div>
      <div className="flex items-center justify-center">
        <button className="bg-primary text-white ">
          {isSubmitting ? <Loader2 className="animate-spin" /> : "Sign Up"}
        </button>
      </div>
    </form>
  );
}
