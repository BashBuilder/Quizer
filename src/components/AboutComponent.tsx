import { Copyright } from "lucide-react";

export default function AboutComponent() {
  return (
    <article className="flex flex-col gap-6 px-6 py-5 md:px-16 md:py-8 xl:px-32">
      <h2 className="text-primary">ABOUT US</h2>
      <div>
        <h4>JOURNEY</h4>
        <p>
          The Journey was conceived an enthusiast who shared a belief: learning
          should be exciting, accessible, and tailored to individual interests.
          Our journey began with a simple idea to create a platform that sparks
          curiosity and fosters a love for knowledge.
        </p>
      </div>

      <div>
        <h4>Author</h4>
        <p>
          <span className="font-semibold">Adelowotan Anthony:</span> The
          visionary behind Quizer, envisioned a space where diverse quizzes
          could cater to the interests of a global audience. Exploring Open
          Trivia Db api, the platform comes to life with seamless functionality
          and user-friendly features.
        </p>
      </div>

      <p className="mx-auto my-4 flex gap-2 text-center font-semibold">
        Copyright <Copyright className="text-primary" />
        <span className="text-primary">BashBuilder</span> All rights reserved.
        <span>{new Date().getFullYear()}</span>
      </p>
    </article>
  );
}
