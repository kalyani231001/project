import Hotel from "../models/Hotel.js"
import { createError } from "../utils/error.js";

export const createHotel = async (request,response,next)=>{
    const newHotel = new Hotel(request.body)
    
    try {
        const savedHotel = await newHotel.save()
        response.status(200).json(savedHotel)
    } catch (error) {
        next(error)
    }
}

export const updateHotel = async (request,response,next)=>{
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(request.params.id, {$set: request.body},{new:true})
        response.status(200).json(updateHotel)
    } catch (error) {
        next(error)
    }
}

export const deleteHotel = async (request,response,next)=>{
    try {
        await Hotel.findByIdAndDelete(request.params.id)
        response.status(200).json("Hotel has been deleted")
    } catch (error) {
        next(error)
    }
}

export const getHotel = async (request,response,next)=>{
    try {
        const hotel = await Hotel.findById(request.params.id)
        response.status(200).json(hotel)
    } catch (error) {
        next(error)
    }
}

export const getHotels = async (request,response,next)=>{
    const { min , max , ...others} = request.query 

    try {
        const hotels = await Hotel.find({
            ...others, 
            cheapestPrice: { $gt:min | 1 , $lt:max || 9999999 },
        }).limit(request.query.limit)
        response.status(200).json(hotels)
    } catch (error) {
        next(error)
    }
}

export const countByCity = async (request,response,next)=>{
    const cities = request.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map((city)=>{
            return Hotel.countDocuments({city:city})
        }))
        response.status(200).json(list)
    } catch (error) {
        next(error)
    }
}

export const countByType = async (request,response,next)=>{
    try {
        const hotelCount =await Hotel.countDocuments({ type : "Hotel" })
        const apartmentCount =await Hotel.countDocuments({ type : "apartment" })
        const resortCount =await Hotel.countDocuments({ type : "resort" })
        const villaCount =await Hotel.countDocuments({ type : "villa" })
        const cabinCount =await Hotel.countDocuments({ type : "cabin" })
        response.status(200).json([
            { type : "hotels", count: hotelCount },
            { type : "apartments", count: apartmentCount },
            { type : "resorts", count: resortCount },
            { type : "villas", count: villaCount },
            { type : "cabins", count: cabinCount },
        ])
    } catch (error) {
        next(error)
    }
}