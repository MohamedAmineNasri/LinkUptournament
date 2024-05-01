class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowercase = message.toLowerCase();

    if (lowercase.includes("hello")) {
      this.actionProvider.greet();
    } else if (lowercase.includes("overview")) {
      this.actionProvider.introduceOverview();
    } else if (lowercase.includes("features")) {
      this.actionProvider.introduceFeatures();
    } else if (lowercase.includes("building tournaments")) {
      this.actionProvider.buildTournaments();
    } else if (lowercase.includes("streaming tournaments")) {
      this.actionProvider.streamTournaments();
    } else if (lowercase.includes("community")) {
      this.actionProvider.introduceCommunity();
    }else {
      this.actionProvider.defaultResponse();
    }
  }
}

export default MessageParser;