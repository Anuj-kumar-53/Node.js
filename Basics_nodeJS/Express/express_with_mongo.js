const express = require("express");

const {connectDB} = require('./connecting_db/connect');
const {logReqRes} = require('./middleware/index');
const route = require('./route/route');

const app = express();
const port = 8000;


app.use(express.urlencoded({extended:false})); // this is a middleware...
connectDB("mongodb+srv://anuj:a67CXV3jLcsFWBsv@cluster0.abuht.mongodb.net/").then((console.log("MongoDB connected"))).catch((err)=>console.log(err));

app.use(logReqRes('log.txt'));
app.use('/user',route);
app.listen(port,()=> console.log(`Start server at port: ${port}`));








//connection to mongos
// mongoose.connect("mongodb+srv://anuj:a67CXV3jLcsFWBsv@cluster0.abuht.mongodb.net/").then(()=>{
    //     console.log("MongoDB connected..")
    // }).catch((err)=>{
        //     console.log("there is an error in connection in mongoDB",err);
        // })

//Schema-for mongo
// const userSch = new mongoose.Schema({
//     firstName:{
//         type:String,
//         required: true,
//     },
//     lastName:{
//         type:String,
//     },
//     email:{
//         type:String,
//         required: true,
//         unique: true,
//     },
//     jobTitle:{
//         type:String,
//     },
//     gender:{
//         type:String,
//         required: false,
//     }

// },{
//     timestamps: true,
// });

// const USER = mongoose.model("user",userSch);//the user is our collection name...


// app.post("/api/users",async (req,res)=>{
//     const body = req.body;
//     if(
//         !body || !body.first_Name || !body.last_Name || !body.email || !body.gender || !body.job_title
//     ){
//         return res.status(400).json({msg: "All fields are req.."});
//     }
//    const result  = await USER.create({
//     firstName: body.first_Name,
//     lastName: body.last_Name,
//     email: body.email,
//     gender: body.gender,
//     jobTitle: body.job_title,
//    });
//    console.log("result",result);
// return res.status(201).json({msg: "Success"});
       
// })
// app.get('/users',async (req,res)=>{
//     const allUser = await USER.find({});
//         const html = ` 
//             <ul>
//                 ${allUser.map((result) => `<li>${result.firstName} - ${result.gender}</li>`).join("")}
//             </ul>
//             `;
//             res.send(html);
        
    
//     })

// app.get("/api/users",async (req,res) =>{
//         const all = await USER.find({});
//         return res.json(all);

//     })

// app.route("/api/users/:id").get(async(req,res)=>{
//     const clients = await USER.findById(req.params.id);
//     if(!clients) return res.status(404).json({error: "user not found"});
//     return res.json(clients);
// }).patch(async(req,res)=>{
//       //TODO: Edit a user with the id..
//       const updates = await USER.findByIdAndUpdate(req.params.id,{firstName: "Changed lets go "})
//       return res.json({status: "success"});
// }).delete(async(req,res)=>{
//     const del = await USER.findByIdAndDelete(req.params.id);
//    return res.json({status:"deleted successfully"});

// });









