import { Router } from "express";
import blogControllers from "../controllers/blogController.js";
import authControllers from "../controllers/authController.js";

const blogRouter=Router();

//CREATING AND FETCHING ALL BLOG POSTS
blogRouter.route("/")
.get(blogControllers.viewAllBlogs)
.post(authControllers.protect,blogControllers.addBlog);

//FETCHING,EDITING,DELETING BLOG POSTS BASED ON IT'S ID & ADDING COMMENTS ON BLOGPOSTS
blogRouter.route("/:id")
.get(blogControllers.viewSingleBlog)
.put(authControllers.protect,blogControllers.updateBlog)
.patch(authControllers.protect,blogControllers.addComment)
.delete(authControllers.protect,blogControllers.removeBlog);

export default blogRouter;