const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/test', async(req, res, next)=>{
    try{
        if(req.session.jwt){
            /**
             * axios.get ({주소, {headers:{헤더}}})
             * axios.post (주소, {데이터})
             */
            const tokenResult = await axios.post('49.247.211.93:8001/v1/token', {
                clientSecret:process.env.CLIENT_SECRET,
            });
            if(tokenResult.data && tokenResult.data.code === 200){
                req.session.jwt = tokenResult.data.token;
            }else{
                return res.json(tokenResult.data);
            }
        }
    
        const result = await axios.get('49.247.211.93:8001/v1/test', {
            headers : {authorization:req.session.jwt},        
        })
        return res.json(result.data);
    }catch(error){
        console.error(error);
        if(error.response.status===419){
            return res.json(error.response.data);
        }
        return next(error);
    }
    
});

module.exports = router;