const express = require("express");
const app = express();
const mainRouter = require("./router/main.js");

app.get('/',(req, rep)=>{
    rep.send("<html><body>hello</body></html>");

});

app.use('/friend', mainRouter);

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});