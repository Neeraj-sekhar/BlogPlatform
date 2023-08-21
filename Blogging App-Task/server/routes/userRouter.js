import { Router } from "express";
import authControllers from "../controllers/authController.js";


const userRouter=Router();

//REGISTER
userRouter.route("/register").post(authControllers.signup);
//LOGIN
userRouter.route("/login").post(authControllers.login);

export default userRouter;