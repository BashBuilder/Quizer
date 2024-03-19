import JambNavbar from "@/components/JambNavbar";
import { useJambContext } from "@/hooks/jambContext";
import { Link } from "react-router-dom";

export default function JambResult() {
  const { questionStates } = useJambContext();

  const { subjectScore, score } = questionStates;

  return (
    <div className=" h-screen bg-green-100 ">
      <JambNavbar />
      <section className="pt-32">
        <div className="col-span-6  ">
          <h2 className="mb-6 text-4xl text-green-950">
            Here is your performance
          </h2>
          {subjectScore.map((suj, index) => (
            <p
              key={index}
              className="my-4 flex justify-between rounded-sm bg-green-500 px-4 py-2 text-2xl capitalize "
            >
              <span>{suj.subject} </span> <span>{suj.score}</span>
            </p>
          ))}
          <p className="my-4 flex justify-between  rounded-sm bg-green-800 px-4 py-2 text-2xl text-white ">
            <span>Total </span> <span> {score}</span>
          </p>
          <div className="my-10 flex gap-10">
            <Link
              to="/jambexam"
              className="rounded-md bg-red-500 px-4 py-2 text-white"
            >
              Check Solution
            </Link>
            <Link
              to="/jambexam"
              className="rounded-md bg-green-600 px-4 py-2 text-white"
            >
              Take Another Test
            </Link>
          </div>
        </div>
        <div className="col-span-6 flex items-center justify-center ">
          <img
            src="/assets/result.png"
            alt="result image illustrator"
            className="hidden w-full max-w-[28rem] object-cover object-right md:inline"
          />
        </div>
      </section>
    </div>
  );
}
