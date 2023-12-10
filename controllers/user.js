import Users from "../model/user.js";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import {sendCookie} from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";
dotenv.config();

export const register = async (req, res,next) => {
    const { name, email, password } = req.body;
    let user = await Users.findOne({ email });
    
    if (user) {
        return next(new ErrorHandler("User already exists",400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await Users.create({
        name,
        email,
        password:hashedPassword,
    })
    sendCookie(user, res, "Registered Successfully", 201);
}

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    let user = await Users.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Register first",404));
    }
    
    const confirmPasword = await bcrypt.compare(password , user.password);
    
    if (!confirmPasword) {
    
        return next(new ErrorHandler("Incorrect Password", 404));
    
    }
    sendCookie(user, res, `Welcome back ${user.name}`, 200);
}

export const getMyDetails = async (req, res, next) => {
    
    res.status(200).json({
        success: true,
        user:req.user,
    })
}

export const logout = async (req, res, next) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: "none",
        secure: true
     }).json({
        success: true,
        message:"Logout successfully",
    })
}
