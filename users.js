import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/userController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (request,response,next)=>{
//     response.send("hello user, you are logged in")
//   })
  
//   router.get("/checkuser/:id", verifyUser, (request,response,next)=>{
//     response.send("hello user, you are logged in and you can delete your account")
//   })
  
//   router.get("/checkadmin/:id", verifyAdmin, (request,response,next)=>{
//     response.send("hello admin, you are logged in and you can delete all accounts")
//   })
    

//CRUD Update
router.put("/:id", verifyUser , updateUser)
//CRUD Delete
router.delete("/:id", verifyUser , deleteUser)
//CRUD Get
router.get("/:id", verifyUser , getUser)
//CRUD GetAll
router.get("/", verifyAdmin , getUsers)

export default router