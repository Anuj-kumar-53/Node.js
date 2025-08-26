const {createHmac, randomBytes} = require('node:crypto'); //this is used for hashing the password

const mongoose = require('mongoose');
const { createTokenForUser } = require('../services/auth');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    salt:{
        type: String,

       
    },
    password: {
        type: String,
        required: true,
    },
    profileImg:{
        type: String,
        default: 'avatar.jpeg',
    },
    role:{
        type: String,
        enum : ['USER','ADMIN'],
        default: 'USER',
    },
},{timestamps: true});

userSchema.pre('save', function (next){
    const user = this;
     if(!user.isModified('password')) return;

     const salt = randomBytes(16).toString();
     const hashedPassword = createHmac('sha256',salt).update(user.password).digest('hex');
     //the first is the algorithm and the second is the text with which we are going to hash..
     this.salt = salt;
     this.password = hashedPassword;
     next();
})
//for signin we have to convert the salt into text and match with the enycripted password
//cause we cant change the encrypted password back..

userSchema.static('matchPasswordAndGenerateToken',async function(email,password){
    const user =  await this.findOne({email});
    if(!user)  throw new Error("User not found signup first..");

    const salt = user.salt;
    const hashedPassword = user.password;
    const userProvidedHash = createHmac('sha256',salt).update(password).digest('hex');

    if(hashedPassword !== userProvidedHash) throw new Error("Invalid username or password");

    const token = createTokenForUser(user);    
    return token;

})


const User = mongoose.model('user',userSchema);
module.exports = User;
