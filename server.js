const express = require('express');
const app = express();

const server = app.listen(8000, ()=>{
    console.log("Express server has started on port 8000.");
});