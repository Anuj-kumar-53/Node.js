
const {v4: uuidv4} = require('uuid');
const user = require('../model/user');
const {setUser} = require('../service/authentication');

async function Sign_in(req,res){
    const {name,email,password} = req.body;
    await user.create({
        name,
        email,
        password,
    });
  
    return res.redirect("/");
}

async function login(req,res){
    try {
        const {email,password} = req.body;
        const customer  = await user.findOne({ email,password });
       if(!customer) return res.render('login',{
        errorMessage: "Invalid User name or password",
       
       })
    //    const sessionId = uuidv4();
       const token = setUser(customer);
       res.cookie("uid", token);
        return res.redirect("/");
        
    } catch (error) {
        console.log("Invalid login attempt", error);
        return res.render("login", { errorMessage: "Something went wrong. Please try again!" });
    }
}
module.exports = {
    Sign_in,
    login,
}