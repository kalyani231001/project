import User from "../models/User.js"
// import { createError } from "../utils/error.js";

export const updateUser = async (request,response,next)=>{
    try {
        const updateUser = await User.findByIdAndUpdate(request.params.id, {$set: request.body},{new:true})
        response.status(200).json(updateUser)
    } catch (error) {
        next(error)
    }
}
export const deleteUser = async (request,response,next)=>{
    try {
        await User.findByIdAndDelete(request.params.id)
        response.status(200).json("User has been deleted")
    } catch (error) {
        next(error)
    }
}
export const getUser = async (request,response,next)=>{
    try {
        const user = await User.findById(request.params.id)
        response.status(200).json(user)
    } catch (error) {
        next(error)
    }
}
export const getUsers = async (request,response,next)=>{
    try {
        const users = await User.find()
        response.status(200).json(users)
    } catch (error) {
        next(error)
    }
}