const express=require("express");

const router=express.Router();


const {addTask,getTasks,getTask,updateTask,deletetask} =require( "../controllers/task.controller.js");

router.post("/",addTask);
router.get("/",getTasks);
router.get("/:id",getTask);
router.put("/:id",updateTask);
router.delete("/:id",deletetask);

module.exports=router;