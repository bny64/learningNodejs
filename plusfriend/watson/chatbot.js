require('dotenv').config({ path: '../.env' });
var prompt = require('prompt-sync')();
var util = require('util');
var ConversationV1 = require('watson-developer-cloud/conversation/v1');

// Set up Conversation service wrapper.
var conversation = new ConversationV1({
  version: process.env.VERSION,
  iam_apikey: process.env.APIKEY, 
  url: process.env.URL
});

const workspace_id = process.env.WORKSPACEID; // replace with workspace ID

function watsonDialog(input, context, initCheck){

    return new Promise((resolved, rejected)=>{
        console.log('chatbot_1');
        let responseObj = {};
        let sendObj = {
            workspace_id : workspace_id,
            input : {text : input}
        }
        //최초 대화 시작

        if(typeof initCheck !== 'undefined'){            
            sendObj.context = context;
        }
        console.log('chatbot_2');

        conversation.message(sendObj, (err, response)=>{

            console.log('chatbot_3');
            if(err){
                rejected(err);
            }
            console.log('chatbot_4');
            console.log(response);
            responseObj.text = response.output.text.join('\n');
            
            console.log('chatbot_5');
            if(typeof initCheck !== 'undefined') responseObj.context = response.output.context;
            
            resolved(responseObj);
        });

    });
}

module.exports = watsonDialog;