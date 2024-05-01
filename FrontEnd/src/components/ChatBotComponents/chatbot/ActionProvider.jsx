class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
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
