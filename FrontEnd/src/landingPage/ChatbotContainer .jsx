import React, { useState } from "react";
import Chatbot from "react-chatbot-kit";
import config from "../components/ChatBotComponents/chatbot/config";
import ActionProvider from "../components/ChatBotComponents/chatbot/ActionProvider";
import MessageParser from "../components/ChatBotComponents/chatbot/MessageParser";
import "react-chatbot-kit/build/main.css";
import gif from "./gif.gif";

const ChatbotContainer = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const chatbotStyle = {
    position: "fixed",
    bottom: "-1px",
    left: "20px",
    zIndex: "1000",
    textAlign: "center",
    transition: "all 0.3s ease-in-out", // Smooth transition animation
    transform: isChatOpen ? "translateY(0)" : "translateY(100%)", // Move chatbot in and out
  };

  return (
    <div>
      <div style={chatbotStyle}>
        <Chatbot
          config={config}
          actionProvider={ActionProvider}
          messageParser={MessageParser}
        />
      </div>
      <div
              style={{
                position: "fixed",
                bottom: "78px",
                left: "20px",
                cursor: "pointer",
                zIndex: "1001",
                width: "157px",
                height: "62px",
                
              }}
              onClick={toggleChat}
            >
              {isChatOpen ? (
                <img
                    src={gif}
                  alt="Close Chat"
                  style={{
                    width: "70px",
                    height: "60px",
                    position: "fixed",
                    bottom: "490px",
                    left: "260px",
                    transition: "all 0.3s ease-in-out",
                  }}
                />
              ) : (
                <img
                src={gif}
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
  );
};

export default ChatbotContainer;
