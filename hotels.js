import express from "express";
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../controllers/hotelcontroller.js";
import Hotel from "../models/Hotel.js"
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//CRUD Create
router.post("/",verifyAdmin ,createHotel)
//CRUD Update
router.put("/:id",verifyAdmin , updateHotel)
//CRUD Delete
router.delete("/:id",verifyAdmin , deleteHotel)
//CRUD Get
router.get("/find/:id", getHotel)
//CRUD GetAll
router.get("/", getHotels)
router.get("/countByCity", countByCity)
router.get("/countByType", countByType)


export default router