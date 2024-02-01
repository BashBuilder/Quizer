import Navbar from "@/components/Navbar";

export default function Result() {
  return (
    <div>
      <Navbar />
      <section className="h-[80%] min-h-[600px] pt-4 md:grid md:grid-cols-12  md:px-10 md:py-8 ">
        <div className=" col-span-6 mx-auto h-full flex-col justify-center gap-6 md:flex ">
          <h1>Weldone</h1>
          <h3>Here is your performance</h3>
          <p>Score : 8 </p>
          <p>Attempted Questions 28 </p>
          <p>ToTal Questions 30</p>

          <div>
            <button className="bg-primary font-semibold text-white">
              Review Questions
            </button>
          </div>
        </div>
        <div className="hidden min-h-full items-center justify-center md:col-span-6 md:flex md:text-left ">
          <img src="assets/sec.png" alt="img" />
        </div>
      </section>
    </div>
  );
}
