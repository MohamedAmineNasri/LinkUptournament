import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import * as GoogleGenerativeAI from "@google/generative-ai";

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.API_KEY = "AIzaSyA9jCrgVSaprlJh491KsjbfXH39_9biJ9A"; // Your GEMINI API key
  }

  greet = () => {
    const message = this.createChatBotMessage("Hello friend.");
    this.addMessageToState(message);
  };

  handleFunFactQuiz = () => {
    const message = this.createChatBotMessage(
      "Fantastic. Here is your quiz. Good luck!",
      {
        widget: "fun fact Quiz",
      }
    );

    this.addMessageToState(message);
  };

  introduceOverview = () => {
    const message = this.createChatBotMessage(
      "Welcome to LinkUpTournament! We provide an innovative football tournament management system that simplifies every aspect of tournament management. From planning and team registration to player management, match coordination, and result tracking, we've got you covered!"
    );
    this.addMessageToState(message);
  };

  introduceFeatures = () => {
    const message = this.createChatBotMessage(
      "Our key features include Tournament Planning, Team Registration, Player Management, Match Coordination, and Result Tracking. With our robust set of features, you can elevate your tournament experience and enjoy seamless management and real-time updates."
    );
    this.addMessageToState(message);
  };

  buildTournaments = () => {
    const message = this.createChatBotMessage(
      "Building football tournaments is our specialty! We help you craft dynamic tournaments for enthusiasts, making the planning process easy and efficient."
    );
    this.addMessageToState(message);
  };

  streamTournaments = () => {
    const message = this.createChatBotMessage(
      "Experience the excitement of live football tournaments with our streaming service! Get real-time commentary and updates to elevate your live football experience."
    );
    this.addMessageToState(message);
  };

  introduceCommunity = () => {
    const message = this.createChatBotMessage(
      "Join our community and foster engaging conversations in the heart of your chatroom experience. Connect with fellow football enthusiasts and share your passion for the game!"
    );
    this.addMessageToState(message);
  };

  handleUserInput = async (inputText) => {
    // Update UI to show loading animation immediately
    this.addMessageToState({
      type: 'loading',
      loading: true
    });

    const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(this.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = inputText;

    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      // Check if the response is not empty
      if (text && text.trim().length > 0) {
        // Create a chatbot message with the response
        const message = this.createChatBotMessage(text);
        // Add the message to state
        this.addMessageToState(message);
      } else {
        this.defaultResponse();
      }
    } catch (error) {
      console.error("Error occurred while generating content:", error);

      // Check if the error is due to RECITATION
      if (error.message.includes("RECITATION")) {
        // Provide a response indicating the issue
        const message = this.createChatBotMessage(
          "I'm sorry, I'm unable to provide a response to that question due to content policies. Can you ask something else?"
        );
        this.addMessageToState(message);
      } else {
        // For other errors, provide a default response
        this.defaultResponse();
      }
    } finally {
      // Always set loading state to false after handling user input
      this.addMessageToState({
        type: 'loading',
        loading: false
      });
    }
  };

  defaultResponse = () => {
    const message = this.createChatBotMessage(
      "I'm sorry, I didn't understand that. Can you please rephrase or ask a different question?"
    );
    this.addMessageToState(message);
  };

  addMessageToState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };
}

export default ActionProvider;
