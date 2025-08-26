const http = require('http');

const express = require('express');
const path = require('path');
const { Server } = require("socket.io");



const app = express();
const server = http.createServer(app);

//this will handle all the socket.io requests
const io = new Server(server);

const port = 9000;

app.use(express.static(path.resolve('./public')));

app.get('/',(req,res) =>{
    return res.sendFile('./public/index.html');
})
//user is called socket
io.on('connection',(socket) => {
    console.log("user connected");
    socket.on('user-message', (message) =>{
        console.log("servere side", message);
        io.emit('message',message);//the io is the server which will send the message to all the users
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    
   
});






server.listen(port,() => console.log(`Server started at port: ${port}`));
