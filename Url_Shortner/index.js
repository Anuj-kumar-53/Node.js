const express = require('express');
const path = require('path'); // this is to set the view folder of ejs
const cookie = require('cookie-parser');
const {connectMongoDB} = require('./connectionDB/connect');
const {OnlyForLoginUsers,checkAuth} = require('./middlewares/authentication');
const URL = require('./model/Schema');

const urlRoute = require('./routes/route');
const StaticRouter = require('./routes/StaticRoute');
const userRoute = require('./routes/user');


const app = express();
const port = 8001;
connectMongoDB("mongodb+srv://anu:anu123@cluster0.dhclo.mongodb.net/").then(()=>{console.log("database connect")}).catch((err)=>{console.log(`there is a connection error in database ${err}`)});

app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookie());

app.use('/url', OnlyForLoginUsers,urlRoute);
app.use('/user',  userRoute);
app.use('/', checkAuth , StaticRouter);


app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId }, 
        { $push: { visitHistory: { timestamp: Date.now() } } },
       
    );

    if (!entry) {
        return res.status(404).send('Short URL not found'); // Handle missing entry
    }

    res.redirect(entry.redirectUrl);
});

app.listen(port,()=>console.log(`Server Started at port: ${port}`));

// app.get('/:shortId',async(req,res)=>{
//     const shortId = req.params.shortId;
//    const entry =  await URL.findOneAndUpdate({
    
//         shortId,
//     },
//     {
//         $push:{
//             visitHistory: {
//                 timestamp: Date.now(),
//             },
//         }
//     },
//     )
//     res.redirect(entry.redirectUrl);
// })

