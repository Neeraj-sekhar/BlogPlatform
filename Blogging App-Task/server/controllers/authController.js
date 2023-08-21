import dotenv from "dotenv";
dotenv.config({path:"./config.env"});
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";

// JWT TOKEN CREATION
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };


// REGISTER
const signup = async (req, res) => {
    try {
        if(!req.body.email || !req.body.name || !req.body.password){
            throw new Error("Email,Name and password field can't be empty");
        }

      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
  
      // JWT ALLOCATION
      const token = signToken(newUser._id);

      const name=req.body.name;
      const username = req.body.email;
      
      res.status(201).json({
        status: "New User Added",
        data: {
          username,
          name,
          token
        },
      });
    } catch (err) {
      res.status(400).json({
        error: err.message,
      });
    }
  };
  

// LOGIN
const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        throw new Error("Provide An Email and Password");
      }
  
      const user = await User.findOne({ email }).select("+password");
      const correct = await user.correctPassword(password, user.password);

      if (!user || !correct) {
        throw new Error("Incorrect Email or Password");
      }

      // JWT ALLOCATION
      const token = signToken(user._id);

      const username=user.email;
      const name = user.name;
      
      res.status(200).json({
        status: "success",
        data: {
            username,
            name,
            token
          },
      });
    } catch (err) {
      res.status(401).json({
        error: err.message,
      });
    }
};

// PROTECT ROUTES
const protect = async (req, res, next) => {
    try {
      // 1. GETTING TOKEN AND CHECK IF IT'S THERE
      let token;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      }
  
      if (!token) {
        throw new Error("You are not logged in! Please Log in to perform this action");
      }
  
      // 2. TOKEN VERIFICATION
      const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        throw new Error(
          "The user belonging to this token does no longer exists."
        );
      }
      
      req.User = currentUser;
      next();
    } catch (err) {

      res.status(400).json({
        error: err.message,
      });
    }
  };

const authControllers={
    signup,
    login,
    protect
}

export default authControllers;