import genToken from "../config/token.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userModel from '../models/user.model.js'


export async function signUp(req, res) {
  try {
    const { name, email, password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({
      $or: [
        { name }, //koi ek condition bhi hit ho jaye like or operator
        { email },
      ],
    });
    if (isUserAlreadyExist) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    //password hashing
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      name,
      email,
      password: hashPassword,
    });

    const token = await genToken(user._id);

    res.cookie("token", token);

    return res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log("error in loginUser : ", error)
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(401).json({
      message: "Inavlid credentials",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Inavlid credentials",
    });
  }

 const token = await genToken(user._id);

  res.cookie("token", token);

  return res.status(200).json({
    message: "Logged in successfully",
    user,
  });

  } catch (error) {
    console.log("Error in login :", error)
  }
}

export async function logout(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "Logged out successfully",
  });
}
