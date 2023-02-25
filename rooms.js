import express from "express";
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom } from "../controllers/roomcontroller.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CRUD Create
router.post("/:hotelid",verifyAdmin ,createRoom)
//CRUD Update
router.put("/:id",verifyAdmin , updateRoom)
//CRUD Delete
router.delete("/:id/:hotelid",verifyAdmin , deleteRoom)
//CRUD Get
router.get("/:id", getRoom)
//CRUD GetAll
router.get("/", getRooms)


export default router