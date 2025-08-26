//.env
require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
// const {checkForAuthenticationCookie} = require('./middleware/auth');
//mongodb connection
const mongoose = require('mongoose');

const Blog = require('./models/blog')



//Routes..
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');

const { checkForAuthenticationCookie } = require('./middleware/authentication');


const app = express();
app.use(express.json());
const port = process.env.PORT || 8000;

//url og mongobd
// mongoose.connect('mongodb+srv://anuj:kchKGg3yhbOMeeRQ@cluster3.kw8rm.mongodb.net/').then((err)=>{ console.log("MongoDB connected.")});
mongoose.connect(process.env.MONGO_URL).then((err)=>{ console.log("MongoDB connected.")});;


app.use(express.urlencoded({extended:false}));

//middleware
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

//middleware for making the public images static
app.use(express.static(path.resolve('./public')));



app.set('view engine', 'ejs');
app.set('views',path.resolve('./views'));

app.get('/',async(req,res)=>{
    const allBlogs = await Blog.find({})
    res.render('home',{user: req.user, blogs: allBlogs});
})


app.use('/user',userRoute);
app.use('/blog',blogRoute);

app.listen(port,()=>{console.log(`Server started at port: ${port}`)});