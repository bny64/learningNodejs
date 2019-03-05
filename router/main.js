const express = require("express");
var router = express.Router();

router.get('/getList',(req, res)=>{
    res.send("getList");
});
router.get('/addList', (req, res)=>{
    res.send("addList");
});

module.exports = router;