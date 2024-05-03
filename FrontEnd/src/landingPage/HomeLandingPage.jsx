import React, { useEffect, useState } from "react";
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
import "react-chatbot-kit/build/main.css";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";

const alanKey =
  "ab3cc3178aa07174cc29ea85da96ef962e956eca572e1d8b807a3e2338fdd0dc/stage";

const HomeLandingPage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, players }) => {
        if (command === "testCommand") {
          console.log(players);
        } else if (command === "dashboard") {
          navigate("manage");
        } else if (command === "profile") {
          navigate("profile");
        } else if (command === "setting") {
          navigate("settings");
        } else if (command === "academies") {
          navigate("dashboardAdmin/academyDS");
        } else if (command === "teams") {
          navigate("dashboardAdmin/teamDS");
        } else if (command === "players") {
          navigate("manage/participant/player");
        } else if (command === "referees") {
          navigate("manage/participant/referee");
        } else if (command === "signin") {
          navigate("signin");
        } else if (command === "signup") {
          navigate("register");
        }
      },
    });
  }, []);

  const chatbotStyle = {
    position: "fixed",
    bottom: "-1px",
    left: "20px",
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
              style={{
                position: "fixed",
                bottom: "20px",
                left: "20px",
                cursor: "pointer",
                zIndex: "1001",
              }}
              onClick={toggleChat}
            >
              {isChatOpen ? (
                <img
                  src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/200e8d139737079.6234b0487404d.gif"
                  alt="Close Chat"
                  style={{
                    width: "50px",
                    height: "50px",
                    position: "fixed",
                    bottom: "490px",
                    left: "260px",
                    transition: "all 0.3s ease-in-out",
                  }}
                />
              ) : (
                <img
                  src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/200e8d139737079.6234b0487404d.gif"
                  alt="Open Chat"
                  style={{
                    width: "200px",
                    height: "150px",
                    // Define smaller dimensions for mobile devices
                    "@media (max-width: 768px)": {
                      width: "150px",
                      height: "100px",
                    },
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default HomeLandingPage;
