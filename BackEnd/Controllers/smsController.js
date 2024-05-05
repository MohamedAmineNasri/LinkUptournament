const twilio = require('twilio');

const accountSid = 'AC987fc7020978a8a135180a168fc46c79';
const authToken = 'acf63117f83e5819abdc2d66f2004119';
const client = new twilio(accountSid, authToken);

const sendSMS = async (to, message) => {
  try {
    await client.messages.create({
      body: message,
      from: '+12512740154',
      to: to
    });
    
  } catch (error) {
    console.error('Failed to send SMS: ', error);
  }
};

module.exports = {
  sendSMS
};
