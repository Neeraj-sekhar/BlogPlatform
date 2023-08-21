import mongoose from "mongoose";

// COMMENT SCHEMA
const commentSchema=new mongoose.Schema({
    comment:{
        type:String,
        trim:true
    },
    comment_author:{
        type:String,
        trim:true
    }
})

// BLOG SCHEMA
const blogSchema=new mongoose.Schema({
    title:{
        type: String,
        required: [true, "A Blog Title is Required"],
        trim: true,
    },
    content:{
        type:String,
        required:[true,"Blog Contnet is Required"],
        trim: true,
    },
    author:{
        type:String,
        required:[true,"Author is required"]
    },
    author_id:{
        type:String,
        required:[true,"Author id is Required"]
    },
    category:{
        type:String,
        enum: {
            values: ["Travel Blog", "Food Blog", "Fashion Blog", "Health Blog", "Tech Blog", "Lifestyle Blog"],
            message: "Only allowed Entries are Travel Blog, Food Blog, Fashion Blog, Health Blog, Tech Blog & Lifestyle Blog"
          },
    },
    comments:[commentSchema]
})

const Blog=mongoose.model("Blog",blogSchema);

export default Blog;