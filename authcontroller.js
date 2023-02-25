import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken"

export const register = async (request,response,next)=>{
    try {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(request.body.password, salt);
        const newUser = new User({
            username:request.body.username,
            email:request.body.email,
            password:hash,
       })
       await newUser.save(
        response.status(201).send("user has been created")
       )

    } catch (error) {
        next(error)
    }
}
export const login = async (request,response,next)=>{
    try {
        const user = await User.findOne({username:request.body.username})
        if(!user) return next(createError(404,"User not found"))

        const isPasswordCorrect = await bcrypt.compare(request.body.password, user.password)
        if(!isPasswordCorrect) 
            return next(createError(400,"Incorrect Username or Password"))

        const token = jwt.sign({id:user._id, isAdmin: user.isAdmin}, process.env.JWT)

        const {password, isAdmin, ...otherDetails} = user._doc  
        response.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({...otherDetails})
       

    } catch (error) {
        next(error)
    }
}