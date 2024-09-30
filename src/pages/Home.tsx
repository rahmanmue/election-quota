import React from "react";
import Navbar from "@/components/landing-page/Navbar";
import Footer from "@/components/landing-page/Footer";
import Hero from "@/components/landing-page/Hero";
import About from "@/components/landing-page/About";
import ScrollToTop from "@/components/ScrollToTop";
import Calculation from "@/components/landing-page/Calculation";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Calculation />
      <About />
      <Footer />
      <ScrollToTop />
      <div className="shadow-hero" />
    </>
  );
};

export default Home;
