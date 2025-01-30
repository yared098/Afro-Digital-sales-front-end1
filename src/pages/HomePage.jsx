import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Features from "../components/Features";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";

const HomePage = () => {
  return (
    <div className="text-green ">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
};

export default HomePage;
