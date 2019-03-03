const express = require('express');
const router = express.Router();
const watson = require('../watson/chatbot');

const storage = require('node-persist');

storage.init();

//최초 진입.
router.get('/keyboard', (req, res)=>{
    res.send({
        type:'text'
    });
});
//after the first conversation.
router.post('/message', async (req, res)=>{
    
    const userKey = req.body.user_key;
    let returnObj = {};

    try{
        //console.log(req.body);
        let context = await storage.getItem(userKey);
        //처음 대화 시작
        if(typeof context ==='undefined'){
            returnObj = await watson(req.body.content, null, true);
            await storage.setItem(userKey, returnObj.context);
            res.send({
                message : {
                    text : returnObj.text
                }
            });

        //대화 중
        }else{
            
            returnObj = await watson(req.body.content, context);
            await storage.setItem(userKey, returnObj.context);
            res.send({
                message : {
                    text : returnObj.text
                }
            });
        }
       
    }catch(error){
        console.error(error);
    }
});

module.exports = router;
