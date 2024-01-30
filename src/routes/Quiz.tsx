import { z } from "zod";
import Navbar from "../components/Navbar";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

export default function Quiz() {
  const quizSchema = z.object({
    amount: z.string(),
    category: z.string(),
    difficulty: z.string(),
  });

  type QuizSchemaType = z.infer<typeof quizSchema>;

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<QuizSchemaType>({ resolver: zodResolver(quizSchema) });

  const submitQuiz: SubmitHandler<QuizSchemaType> = (data) => {
    console.log(data);
  };

  return (
    <div className=" relative h-screen min-h-[600px] ">
      <img
        src="assets/bg2.png"
        alt="background"
        className="absolute -z-10 h-full w-full bg-cover opacity-10"
      />
      <Navbar />
      <section className="h-[80%] pt-12 md:grid md:grid-cols-12  md:px-10 md:py-8 ">
        <div className="col-span-6 hidden h-full items-center md:flex ">
          <img
            src="assets/pen.png"
            alt="pencils"
            className="duration-50000 mx-auto my-auto max-w-[25rem] animate-spin "
          />
        </div>
        <div className="flex items-center justify-center md:col-span-6 md:text-left ">
          <form
            onSubmit={handleSubmit(submitQuiz)}
            className=" flex w-4/5 max-w-[25rem] flex-col gap-6 rounded-xl bg-white p-10  "
          >
            <h2 className="capitalize">setup quiz</h2>
            {/* amount */}
            <div className="flex flex-col gap-2">
              <label htmlFor="amount">Number of Questions</label>
              <input
                type="number"
                id="amount"
                className="rounded-md bg-red-50 px-4 py-2"
                min={1}
                max={50}
                {...register("amount")}
              />
            </div>
            {/* category */}
            <div className="flex flex-col gap-2">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                className="rounded-md bg-red-50 p-2"
                {...register("category")}
              >
                <option value="sports">Sports</option>
                <option value="history">History</option>
                <option value="politics">Politics</option>
              </select>
            </div>
            {/* difficulty */}
            <div className="flex flex-col gap-2">
              <label htmlFor="difficulty">select difficulty</label>
              <select
                id="difficulty"
                className=" rounded-md bg-red-50 p-2 "
                {...register("difficulty")}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <button type="submit" className="border-2 bg-primary text-white">
              {isSubmitting ? <Loader2 className="animate-spin" /> : "Start"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
