// we are designing a restfull api...json

const express = require("express");
const users = require('./MOCK_DATA.json');
const fs = require('fs');

//MiddleWare to take the data from the postman
//this has the capability to send the response to the clint
const app = express();
app.use(express.urlencoded({extended:false}));

app.use((req,res,next)=>{
    console.log("i m middleware");
    // return res.json({middle: "ware"}); it send the response from here only 
    next(); //now the response will go from the server...

})

app.use((req,res,next)=>{
    fs.appendFile('log.txt',`${Date.now()}, ${req.method}, ${req.path}\n`,(err,data)=>{
        next();
    })
})

const port = 8000;
app.get("/api/users",(req,res)=>{
    return res.json(users);
})

//Server side rendering is faster and it sends html file

//this is just an example of html file send as a response
// app.get('/users',(req,res)=>{
//     const html = ` 
//         <ul>
//             ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
//         </ul>
//         `;
//         res.send(html);
    

// })

// Dynamic Path Paramenter
// GET /api/users/:id 
// :id ->this is a variable through this we can target a particular id

app.get("/api/users/:id", (req,res) =>{
    const id = Number(req.params.id);
    const user = users.find((user)=> user.id === id);
    return res.json(user);
})

app.post("/api/users",(req,res)=>{
    //TODO: creat a user and insert into the database
    const body = req.body;
    users.push({...body, id : users.length+1});
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{

        return res.json({status: "sucesses",id: users.length});
    })
})
app.patch("/api/users/:id",(req,res)=>{
    //TODO: Edit a user with the id..
    return res.json({status: "pending"});
})
app.delete("/api/users/:id",(req,res)=>{
    //TODO: delete a user with the id..
    const id = Number(req.params.id);
    const user = users.find((user)=> user.id === id);
  
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, user), (err) => {
        if (err) {
            return res.status(500).json({ error: "Failed to update file" });
        }
        res.json({ status: "deleted", id });
    });
    // return res.json({status: "deleted", id: user.id});
})


//since we are performing multiple task on /api/users/:id we can write one route function on that
// app.route("/api/users/:id").get((req,res)=>{
//     const id = Number(req.params.id);
//     const user = users.find((user)=> user.id === id);
//     return res.json(user);
// }).patch((req,res)=>{
//       //TODO: Edit a user with the id..
//       return res.json({status: "pending"});
// }).delete((req,res)=>{

// });
// this way we can write and what ever the user request that will happen 


app.listen(port,()=> console.log(`Start server at port: ${port}`));
















//Versions...
// express version 4.18.2
// 1st part -> 4
// 2nd part -> 18
// 3srd part -> 2

// 3rd part(last-part) - Minor fixes(optional to update)
// 2nd part - Recommended Bug Fix(secure);
// 1st part - measure fixes 

// ^4.18.2 -> ^ means that version 4 is fixed
//~4.18.2 this means that we wont change the second part also..only the 3rd part we can change




