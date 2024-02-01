import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { quizCategories } from "../data/data";
import { useQuizContext } from "@/hooks/quizContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function GetQuiz() {
  const { getQuiz, formState, quiz } = useQuizContext();
  const { loading, error } = formState;
  const navigate = useNavigate();

  const quizSchema = z.object({
    amount: z.union([
      z.string().min(1, { message: "Fill all the forms" }),
      z.number(),
    ]),
    category: z.string().min(2, { message: "Fill all the forms" }),
    type: z.string().min(1, { message: "Fill all the forms" }),
    difficulty: z.string().min(1, { message: "Fill all the forms" }),
  });

  type QuizSchemaType = z.infer<typeof quizSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuizSchemaType>({ resolver: zodResolver(quizSchema) });

  const submitQuiz: SubmitHandler<QuizSchemaType> = (data) => {
    getQuiz(data.amount, data.category, data.difficulty, data.type);
  };

  useEffect(() => {
    !loading && quiz?.length > 1 ? navigate("/answerQuiz") : navigate("/quiz");
    // eslint-disable-next-line
  }, [loading]);

  return (
    <div className=" relative min-h-[600px]  ">
      <img
        src="assets/bg2.png"
        alt="background"
        className="absolute -z-10 h-full w-full bg-cover opacity-10"
      />
      <section className=" min-h-[600px] pt-10  md:grid md:grid-cols-12 md:px-10 md:py-8 ">
        {/* left container pencil */}

        <div className="col-span-6 hidden h-full items-center md:flex ">
          <img
            src="assets/pen.png"
            alt="pencils"
            className="mx-auto my-auto max-w-[25rem] animate-spin duration-50000 "
          />
        </div>
        {/* right form container  */}
        <div className="flex min-h-full items-center justify-center md:col-span-6 md:text-left ">
          <form
            onSubmit={handleSubmit(submitQuiz)}
            className=" flex w-4/5 max-w-[25rem] flex-col gap-4 rounded-xl bg-white   "
          >
            <h2 className="capitalize text-slate-700 ">setup quiz</h2>
            {/* amount */}
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-slate-500">
                Number of Questions
              </p>
              <input
                type="number"
                id="amount"
                className="rounded-md bg-red-50 px-4 py-2"
                min={2}
                max={50}
                defaultValue={2}
                {...register("amount")}
              />
            </div>
            {/* category */}
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-slate-500">Category</p>
              <Select>
                <SelectTrigger className="w-full bg-orange-50">
                  <SelectValue placeholder="Select Question Category" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {Object.keys(quizCategories).map((category, index) => (
                    <SelectItem
                      key={index}
                      value={category}
                      className="capitalize"
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* difficulty */}
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-slate-500">Select Difficulty</p>
              <Select>
                <SelectTrigger className="bg-orange-50">
                  <SelectValue placeholder="Choose a Difficulty Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-slate-500">Exam Type</p>
              <Select>
                <SelectTrigger className="bg-red-50">
                  <SelectValue placeholder="Choose a Difficulty Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multiple">Multiple</SelectItem>
                  <SelectItem value="boolean">True or False</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(errors.amount ||
              errors.category ||
              errors.difficulty ||
              errors.type) && (
              <p className="text-red-500"> Fill all the forms kindly </p>
            )}
            {error && (
              <p className="text-red-500"> Fill all the forms kindly </p>
            )}
            <button
              type="submit"
              className="mt-2 flex items-center justify-center border-2 bg-primary text-white disabled:opacity-35"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" /> : "Start"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
