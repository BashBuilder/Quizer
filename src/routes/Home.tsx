import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="h-screen min-h-[600px]">
      <Navbar />
      <section className="h-[90%] items-center justify-items-center pt-12 md:grid md:grid-cols-12  md:px-10 md:py-8 ">
        <div className="flex flex-col gap-10 md:col-span-6 md:text-left ">
          <h1 className="text-center capitalize leading-[3.5rem] tracking-wider md:w-[25rem] md:text-left ">
            Learn new concepts with each question
          </h1>
          <p className=" relative mx-auto pl-4 text-slate-700 before:absolute before:-left-0 before:mr-4 before:h-full before:w-1 before:rounded-md before:bg-primary md:mx-0 ">
            Take a quiz today
          </p>
          <div className="flex justify-center md:justify-start">
            <button className=" bg-primary font-semibold text-white hover:opacity-90 hover:shadow-xl">
              Take Quiz
            </button>
          </div>
        </div>
        <div className="col-span-12 col-start-7">
          <img src="assets/homeIcon.png" alt="welcome" className="w-full " />
        </div>
      </section>
    </div>
  );
}

export default Home;
