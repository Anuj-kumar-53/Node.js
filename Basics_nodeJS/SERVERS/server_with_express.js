// const http = require("http"); no need to use this 
//now as we use express we dont need to use http express with make it on its own
const express = require("express");
const app = express();

app.get('/', (req,res) => {
    return res.end("welcome to home page");
})
app.get('/about',(req,res)=>{
    return res.send("you are in about page" + req.query.name);
})
// similer with the post method also 
app.listen(7000,()=> console.log("with express server."));

// const myServer = http.createServer(app);
// myServer.listen(8000,()=>console.log("Server started with express"));







