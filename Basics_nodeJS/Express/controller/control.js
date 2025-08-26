const USER = require('../model/user_schema');
async function handleAllGetUsers(req,res){
    const allUsers = await USER.find({});
    return res.json(allUsers);
}

async function GetUserById(req,res){
    const userById = await USER.findById(req.params.id);
    if(!userById) return res.status(404).json({error:"no user found"});
    return res.json(userById);
}
async function UpadateById(req,res){
    const updates = await USER.findByIdAndUpdate(req.params.id,{firstName: "YOur name got chnaged "})
    return res.json({status: " change success"});
}
async function DeleteById(req,res){
    const del = await USER.findByIdAndDelete(req.params.id);
   return res.json({status:"deleted successfully"});
}


async function CreateNewUser(req,res){
    const body = req.body;
    if(
        !body || !body.first_Name || !body.last_Name || !body.email || !body.gender || !body.job_title
    ){
        return res.status(400).json({msg: "All fields are req.."});
    }
   const result  = await USER.create({
    firstName: body.first_Name,
    lastName: body.last_Name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
   });
   console.log("result",result);
return res.status(201).json({msg: "Success",id: result._id});
}
module.exports = {
    handleAllGetUsers,
    GetUserById,
    UpadateById,
    DeleteById,
    CreateNewUser,
}