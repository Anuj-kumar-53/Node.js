const http = require("http");
const fs = require("fs");
// const myServer = http.createServer((request,response) => {
//     const log = `${Date.now().toLocaleString()}: Request from the clint\n`;
//     //remember all use non-blocking
//     fs.appendFile('./test.txt',log,(err,data)=>{
//         response.end("This is from the server end");

//     });

// });

// myServer.listen(8000,()=>console.log("this is just to conform that server has started"));

//now we will make a server that will go to different site like /about /help and we will display different things based on that
const mySer = http.createServer((req,res)=>{
    const logs = `${Date.now().toString()}: ${req.url}: new request..\n`;
    fs.appendFile("./new.txt",logs,(err,data) =>{
        switch(req.url){
            case '/': res.end("THis is HomePage");
            break;
            case '/about': res.end("this is about section");
            break;
            case '/contact': res.end("THis is Contact Section");
            break;
            default: res.end("You have entered and invalid section");
        }
    });
});

mySer.listen(8001,()=>{console.log("My new server started")});


