import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Field `username` is required"],
    match: [/^[a-zA-Z0-9._]+$/, "Field `username` can have letters, numbers, periods or underscores only"],
    unique: true
  },
  name: {
    type: String,
    required: [true, "Field `name` is required"],
    maxLength: [30, "Field `name` cannot "],
    minLength: [2, "Field `name` must be more than 2 characters"],
  },
  email: {
    type: String,
    required: [true, "Field `email` is required"],
    match: [/\S+@\S+\.\S+/, "Field `email` must be an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Field `password` is required"],
    minLength: [8, "Field `password` must be more than 8 characters"],
    select: false,  // makes sure does not appear in select
  },
  role: {
    type: String,
    default: "user"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

// hashing the password before saving in the database
userSchema.pre("save", async function(next){
  if(!this.isModified("password")){
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
})

// getting the jwt token for the user
userSchema.methods.getjwttoken = function(){
  return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

userSchema.methods.comparepassword = async function(password){
  return await bcrypt.compare(password, this.password)
}

export default mongoose.model("User", userSchema);
