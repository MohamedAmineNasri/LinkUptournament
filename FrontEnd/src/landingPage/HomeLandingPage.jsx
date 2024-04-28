import React from "react";
import Header from "../components/landingpage/Header";
import Hero from "../components/landingpage/Hero";
import FeaturesBlocks from "../components/landingpage/FeaturesBlocks";
import Features from "../components/landingpage/Features";
import Testimonials from "../components/landingpage/Testimonials";
import Newsletter from "../components/landingpage/Newsletter";
import Footer from "../components/landingpage/Footer";
import Chatbot from "react-chatbot-kit";

import config from "../components/ChatBotComponents/chatbot/config";
import ActionProvider from "../components/ChatBotComponents/chatbot/ActionProvider";
import MessageParser from "../components/ChatBotComponents/chatbot/MessageParser";
import 'react-chatbot-kit/build/main.css'

const HomeLandingPage = () => {
  const chatbotStyle = {
    position: "fixed",
    bottom: "20px", // Adjust as needed
    right: "20px", // Adjust as needed
    zIndex: "1000", // Ensure it's above other content
    // Your existing styles
    textAlign: "center",
    // backgroundColor: "#282c34",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  };
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
          <div style={chatbotStyle}>
            <Chatbot
              config={config}
              actionProvider={ActionProvider}
              messageParser={MessageParser}
            />
          </div>
        </div>
      </div>
    </main>
    <Footer/>
    </>
  );
};

export default HomeLandingPage;
