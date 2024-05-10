class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowercase = message.toLowerCase();

    // Pass user input to ActionProvider for handling
    this.actionProvider.handleUserInput(message);
  }
}

export default MessageParser;
