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
        let responseObj = {};
        let sendObj = {
            workspace_id : workspace_id,
            input : {text : input}
        }
        //최초 대화 시작

        if(typeof initCheck !== 'undefined'){            
            sendObj.context = context;
        }

        conversation.message(sendObj, (err, response)=>{

            if(err){
                rejected(err);
            }
            responseObj.text = response.output.text.join('\n');
            
            if(typeof initCheck !== 'undefined') responseObj.context = response.output.context;
            
            resolved(responseObj);
        });

    });
}

module.exports = watsonDialog;