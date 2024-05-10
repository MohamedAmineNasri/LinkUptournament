import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

import Options from "../components/Options/Options";
import Quiz from "../components/Quiz/Quiz";

const config = {
  botName: "LinkUptournament",
  initialMessages: [
    createChatBotMessage(`Hello,How can I assist you?`, {
      widget: "options",
    }),
  ],
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
    },
    {
      widgetName: "fun fact Quiz",
      widgetFunc: (props) => <Quiz {...props} />,
      props: {
        questions: [
          {
            question: "When was the first FIFA Women's World Cup held?",
            answer: "The first FIFA Women's World Cup was held in 1991 in China.",
            id: 3,
          },
          {
            question: "Which country has won the most FIFA World Cup titles?",
            answer: "Brazil has won the most FIFA World Cup titles, with a total of 5 wins.",
            id: 4,
          },
          {
            question: "Who is the only player to have won the FIFA World Cup three times?",
            answer: "Pelé from Brazil is the only player to have won the FIFA World Cup three times (1958, 1962, 1970).",
            id: 5,
          },
          {
            question: "What is the fastest goal scored in FIFA World Cup history?",
            answer: "Hakan Şükür of Turkey scored the fastest goal in FIFA World Cup history, just 11 seconds into the match against South Korea in the 2002 World Cup.",
            id: 6,
          },
          {
            question: "Who is the youngest player to have scored in a FIFA World Cup?",
            answer: "Pelé from Brazil is the youngest player to have scored in a FIFA World Cup. He scored his first goal at the age of 17 years and 239 days in the 1958 World Cup.",
            id: 7,
          },
        ],
      },
    },
    
  ],
};

export default config;
