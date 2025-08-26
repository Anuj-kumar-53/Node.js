//we have install nanoid for short url generation
const shortid = require('shortid');
const url = require('../model/Schema');

async function GenerateNewUrl(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error:"url is required"});
    const shortId = shortid();
    await url.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    })
    return res.render('home',{id: shortId});
}

async function GetAna(req,res){
    const shortId = req.params.shortId;
    const result = await url.findOne({shortId});
    return res.json({totalClicks: result.visitHistory.length,analytics: result.visitHistory})
}


module.exports = {
    GenerateNewUrl,GetAna,
};