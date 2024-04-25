import React from "react";
import Header from "../components/landingpage/Header";
import Hero from "../components/landingpage/Hero";
import FeaturesBlocks from "../components/landingpage/FeaturesBlocks";
import Features from "../components/landingpage/Features";
import Testimonials from "../components/landingpage/Testimonials";
import Newsletter from "../components/landingpage/Newsletter";
import Footer from "../components/landingpage/Footer";

const HomeLandingPage = () => {
  return (
    <>
    <main className="grow">
      <div
        className={`font-inter antialiased bg-white text-gray-900 tracking-tight`}
      >
        <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
          <Header />
          <Hero />
          <Features />
          <FeaturesBlocks />
          <Testimonials />
          <Newsletter />
        </div>
      </div>
    </main>
    <Footer/>
    </>
  );
};

export default HomeLandingPage;
