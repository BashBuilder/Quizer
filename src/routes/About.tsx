import AboutComponent from "@/components/AboutComponent";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div className="flex min-h-[600px] flex-col justify-between ">
      <AboutComponent />
      <Footer />
    </div>
  );
}
