require('dotenv').config();

const prompt = require('prompt-sync')();
const ConversationV1 = require('watson-developer-cloud/assistant/v1');

const conversation = new ConversationV1({
  version: process.env.VERSION,
  username: process.env.USER,
  password: process.env.PASSWORD,
  url: process.env.URL
});

const workspace_id = process.env.WORKSPACEID;

conversation.message({
    workspace_id:workspace_id
}, processResponse);

function processResponse(err, response){
    if (err) {
        console.error(err); // something went wrong
        return;
    }
    
    // If an intent was detected, log it out to the console.
    if (response.intents.length > 0) {
    console.log('Detected intent: #' + response.intents[0].intent);
    }

    // Display the output from dialog, if any.
    if (response.output.text.length != 0) {
        console.log(response.output.text[0]);
    }

    // Prompt for the next round of input.
    var newMessageFromUser = prompt('>> ');
    conversation.message({
    workspace_id: workspace_id,
    input: { text: newMessageFromUser }
    }, processResponse)
}
