const {Schema, model} = require('mongoose');

const blogSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    coverImgUrl:{
        type: String,
        required: false,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user", //the user here if from model/user and then at the end we have passed "user" that one
    },

},{timestamps:true});

const Blog = model("blog",blogSchema);
module.exports = Blog;
