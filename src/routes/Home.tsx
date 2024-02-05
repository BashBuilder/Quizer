import Why from "@/components/Why";
import HowItWorks from "@/components/HowItWorks";
import AboutComponent from "@/components/AboutComponent";
import Footer from "@/components/Footer";
import HomeLanding from "@/components/HomeLanding";

function Home() {
  return (
    <div className="overflow-hidden">
      <HomeLanding />
      <Why />
      <HowItWorks />
      <AboutComponent />
      <Footer />
    </div>
  );
}

export default Home;
