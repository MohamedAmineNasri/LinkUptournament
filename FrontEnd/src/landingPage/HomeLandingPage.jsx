import React, { useState } from "react";
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
  const [isChatOpen, setIsChatOpen] = useState(false);

  const chatbotStyle = {
    position: "fixed",
    bottom: "-1px", 
    right: "20px",
    zIndex: "1000",
    textAlign: "center",
    transition: "all 0.3s ease-in-out", // Smooth transition animation
    transform: isChatOpen ? "translateY(0)" : "translateY(100%)", // Move chatbot in and out
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen); // Toggle the chat state
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
          {/* Toggleable chatbot */}
          <div style={chatbotStyle}>
            <Chatbot
              config={config}
              actionProvider={ActionProvider}
              messageParser={MessageParser}
            />
          </div>
          {/* Chat icon */}
          <div 
            style={{ position: "fixed", bottom: "20px", right: "20px", cursor: "pointer", zIndex: "1001" }} 
            onClick={toggleChat}
          >
            {isChatOpen ? (
              <img 
                src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/200e8d139737079.6234b0487404d.gif" 
                alt="Close Chat" 
                style={{ width: "50px", height: "50px", position: "fixed", bottom: "457px", right: '8px', transition: "all 0.3s ease-in-out",

              }} 
              />
            ) : (
              <img 
              src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/200e8d139737079.6234b0487404d.gif" 
              alt="Open Chat" 
              style={{ 
                width: "250px", 
                height: "250px",
                // Define smaller dimensions for mobile devices
                "@media (max-width: 768px)": {
                  width: "150px",
                  height: "150px",
                }
              }} 
            />
            )}
          </div>
        </div>
      </div>
    </main>
    <Footer/>
    </>
  );
};

export default HomeLandingPage;
