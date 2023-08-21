import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema=new mongoose.Schema({

  name: {
    type: String,
    required: [true, "Name is Required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "provide a valid email id"],
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
    minlength: [5, "password must have a minimum of 5 characters"],
    select: false,
  },

});

//HASHING PASSWORD
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
  
    this.password = await bcrypt.hash(this.password, 12);
    next();
  });

//CHECKING PASSWORD
userSchema.methods.correctPassword = async function (candidatePassword,userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);
export default User;