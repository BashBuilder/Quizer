import { CheckSquare2Icon } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="gap-6 py-5">
      <div className="col-span-6 flex flex-col gap-6 ">
        <h4 className="text-primary">HOW</h4>
        <h2 className="text-slate-800">How It Works</h2>
        <ul>
          <li>
            <p className="my-3 flex gap-2 text-lg font-semibold text-slate-700">
              <CheckSquare2Icon className="text-primary" />
              <span>
                Explore Categories: Browse through our diverse categories and
                select the quiz that piques your interest.
              </span>
            </p>
          </li>
          <li>
            <p className="my-3 flex gap-2 text-lg font-semibold text-slate-700">
              <CheckSquare2Icon className="text-primary" />
              <span>
                Challenge Yourself: Answer a series of engaging questions and
                discover fascinating facts along the way.
              </span>
            </p>
          </li>
          <li>
            <p className="my-3 flex gap-2 text-lg font-semibold text-slate-700">
              <CheckSquare2Icon className="text-primary" />
              <span>
                Track Your Progress: Monitor your achievements, see where you
                stand among your peers, and celebrate your successes.
              </span>
            </p>
          </li>
        </ul>
      </div>
      <div className="col-span-6">
        <img src="assets/svg/slider-5.svg" alt="how" />
      </div>
    </section>
  );
}
