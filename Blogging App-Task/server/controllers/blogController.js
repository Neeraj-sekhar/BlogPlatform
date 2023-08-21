import Blog from "../models/blogModel.js";

// 1.ADD NEW BLOG
const addBlog=async(req,res)=>{
    try{
        req.body.author = req.User.name;
        req.body.author_id=req.User.id;

        const newBlog=await Blog.create(req.body);

        res.status(201).json({
            status:"Blog Added Successfully",
            data:{
                newBlog
            }
            
        })
    }
    catch(err){
        res.status(400).json({
            error:err.message
        })
    }
}

// 2.VIEW ALL BLOGS
const viewAllBlogs=async(req,res)=>{
    try{
        //PAGINATION
        let query=Blog.find();
        const page=req.query.page*1;
        const limit=req.query.limit*1;
        const skip=(page-1)*limit;

        query=query.skip(skip).limit(limit);

        if(req.query.page){
            const blogNum=await Blog.countDocuments();
            if(skip>=blogNum){
                throw new Error('This page Does not Exists.')
            }
        }

        const allBlogs=await query;
        res.status(200).json({
            status:"Success",
            data:{
                allBlogs
            }
        })
    }

    catch(err){
        res.status(400).json({
            error:err.message
        })
    }
}

// 3.VIEW SINGLE BLOG
const viewSingleBlog=async(req,res)=>{
    try{
        const blog_id=req.params.id;
        const singleBlog=await Blog.findById(blog_id);

        res.status(200).json({
            status:"success",
            data:{
                singleBlog
            }
        })
    }
    catch(err){
        res.status(400).json({
            error:err.message
        })
    }
}

// 4.EDIT BLOG
const updateBlog=async(req,res)=>{
    try{
        const blog_id=req.params.id;

        req.body.author=req.User.name;
        req.body.author_id=req.User.id;

        const blog=await Blog.findById(blog_id);
       
        // CHECKING WHETHER THE USER IS SAME AS THE AUTHOR OF THE BLOG
        if(blog.author_id!==req.User.id){
            throw new Error('You are not authorized for this action');
        }

        const updatedBlog=await Blog.findByIdAndUpdate(blog_id,req.body,{new:true},{runValidators:true});
        res.status(200).json({
            status:"Successfully Updated",
            data:{
                updatedBlog
            }
        })

    }
    catch(err){
        res.status(400).json({
            error:err.message
        })
    }
}

// 5.DELETE BLOG
const removeBlog=async(req,res)=>{
    try{
        const blog_id=req.params.id;
        const blog=await Blog.findById(blog_id);

        // CHECKING WHETHER THE USER IS SAME AS THE AUTHOR OF THE BLOG
        if(blog.author_id!==req.User.id){
            throw new Error('You are not authorized for this action');
        }

        const deleteBlog=await Blog.findByIdAndDelete(blog_id);

        res.status(200).json({
            status:"Blog Deleted Successfully"
        })
    }
    catch(err){
        res.status(400).json({
            error:err.message
        })
    }
}

// 6.ADDING COMMENTS
const addComment=async(req,res)=>{
    try{
        const blog_id=req.params.id;
        req.body.comment_author=req.User.name;
        
        const commentData=req.body;
      
        const blog=await Blog.findByIdAndUpdate(blog_id,{ $push: { comments: commentData } },{new:true});

        res.status(200).json({
            status:"Comment Added Successfully",
            data:{
                blog
            }
        })
    }
    catch(err){
        res.status(400).json({
            error:err.message
        })
    }
}

const blogControllers={
    addBlog,
    viewAllBlogs,
    viewSingleBlog,
    updateBlog,
    removeBlog,
    addComment
}

export default blogControllers;