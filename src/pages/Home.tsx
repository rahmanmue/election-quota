import React from "react";
import { Navbar } from "@/components/landing-page/Navbar";
import Hero from "@/components/landing-page/Hero";
import About from "@/components/landing-page/About";
import { Footer } from "@/components/landing-page/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Footer />
      <ScrollToTop />
      <div className="shadow-hero" />
    </>
  );
};

export default Home;
