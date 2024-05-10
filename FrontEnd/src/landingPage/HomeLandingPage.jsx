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
import gif from "./gif.gif";
import './cha.css'; 
const alanKey =
  "ab3cc3178aa07174cc29ea85da96ef962e956eca572e1d8b807a3e2338fdd0dc/stage";
import ChatbotContainer from "./ChatbotContainer ";

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
            <ChatbotContainer />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default HomeLandingPage;
