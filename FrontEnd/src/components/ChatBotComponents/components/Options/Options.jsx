import React from "react";
import "./Options.css";

const Options = (props) => {
  const options = [
    {
      text: "Overview",
      handler: props.actionProvider.introduceOverview,
      id: 1,
    },
    { text: "Features", handler: props.actionProvider.introduceFeatures, id: 2 },
    {
      text: "Building Tournaments",
      handler: props.actionProvider.buildTournaments,
      id: 3,
    },
    {
      text: "Streaming Tournaments",
      handler: props.actionProvider.streamTournaments,
      id: 4,
    },
    {
      text: "Community",
      handler: props.actionProvider.introduceCommunity,
      id: 5,
    },
    {
        text: "Fun Fact Quiz",
        handler: props.actionProvider.handleFunFactQuiz,
        id: 6,
      },
  ];

  const buttonsMarkup = options.map((option) => (
    <button key={option.id} onClick={option.handler} className="option-button">
      {option.text}
    </button>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default Options;