import { CheckCheckIcon } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Why() {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 3000,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <section className="gap-6 ">
      <div
        className="order-2 col-span-6 w-auto md:order-1"
        data-aos="fade-right"
      >
        <img src="assets/svg/slider-1.svg" alt="slider-1" className="w-full" />
      </div>

      <div
        className="order-1 col-span-6 flex flex-col gap-6 md:order-2 "
        data-aos="fade-left"
      >
        <h4 className="font-semibold text-primary"> WHY </h4>
        <h2>Quizer: Quizzing Beyond Boundaries</h2>
        <p>
          Are you prepared to engage your intellect, acquire new insights, and
          enjoy an enriching experience? Quizer offers a diverse range of
          quizzes tailored to cater to every interest and curiosity.
        </p>
        <ul>
          <li>
            <p className="my-3 flex gap-2 text-lg font-semibold text-slate-700 ">
              <CheckCheckIcon className="text-primary" />
              <span>Elevate your mind with thought-provoking quizzes.</span>
            </p>
          </li>
          <li>
            <p className="my-3 flex gap-2 text-lg font-semibold text-slate-700 ">
              <CheckCheckIcon className="text-primary" />
              <span>
                Explore diverse categories from science to pop culture
              </span>
            </p>
          </li>
          <li>
            <p className="my-3 flex gap-2 text-lg font-semibold text-slate-700">
              <CheckCheckIcon className="text-primary" />
              <span>
                Offering fun for students, professionals, and families.
              </span>
            </p>
          </li>
          <li>
            <p className="my-3 flex gap-2 text-lg font-semibold text-slate-700">
              <CheckCheckIcon className="text-primary" />
              <span>
                Secure and User-Friendly: Your privacy is of utmost importance
                to us.
              </span>
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}
