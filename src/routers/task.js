//importing the required packages
const express = require("express");
const dotenv = require("dotenv");
const TaskRouter=express.Router();

const connectDB = require("../config/database");
const taskModel = require("../models/taskdb");
const {Auth}=require("../middlewares/auth");

dotenv.config();
connectDB();

TaskRouter.use(express.json());

const data="title description status createdAt updatedAt";

//post api to add a new task in the database
TaskRouter.post("/tasks", Auth ,async (request, response) => {
    try {
        const { title, description, status } = request.body;
        const task = new taskModel({
            title,
            description,
            status,
            user: request.user._id
        });

        await task.save();

        response.json({
            message:"task added successfully",
            task
        });
    }
    catch (err) {
        response.status(400).send("some error is there : " + err.message);
    }
});
// fetch api for all tasks
TaskRouter.get("/tasks", Auth ,async (request, response) => {
    try {
        const tasks = await taskModel.find({user: request.user._id});
        // checking if any task exist or not
        if(!tasks || tasks.length==0){
            return response.status(404).send("No task found for you");
        }
        response.json({
            message:"here your all tasks",
            tasks,
        })
    }
    catch (err) {
        response.status(400).send("some error is there : " + err.message);
    }
});

// get api for particular tasks id
TaskRouter.get("/tasks/:id", Auth ,  async (request,response)=>{
    
    try{
        // take the task id form the request
    const id=request.params.id;
    // find the particular task by its id using findById function
    const tasks= await taskModel.findById({_id:id,user: request.user._id});
    
        if(!tasks){
            return response.status(404).send("no task found for you");
        }
        response.json({
            message:"here your task",
            tasks,
        })
    }
    catch (err) {
        response.status(400).send("some error is there : " + err.message);
    }
})

//update api, can also be done using put
TaskRouter.patch("/tasks/:id", Auth, async (request, response) => {
  try {
    // get the task details by request parameters
    const taskId = request.params.id;
    // request.body contains the task new status taken from frontend
    const { status } = request.body;

    const allowedStatus = ["pending", "in-progress", "complete"];
    //check if status is not a valid status
    if (!allowedStatus.includes(status)) {
      throw new Error("Invalid status value : "+status);
    }
    // retrieve the task object from the DB
    const task = await taskModel.findOne({taskId,user: request.user._id});
    if (!task) {
      throw new Error("Task not found");
    }
    //checking if the current status is same as the new status send by user, no updation required
    if (task.status === status) {
      return response.json({
        message: `No update: task is already marked "${status}"`,
        task
      });
    }
    // updating the status and saving back in the DB
    task.status = status;
    await task.save();

    response.json({
      message: "Task status updated successfully",
      task
    });
  } catch (err) {
    response.status(400).send("some error is there : " + err.message);
  }
});

//delete api
TaskRouter.delete("/tasks/:id", Auth, async (request, response) => {
  try {
    //getting the task id by request parameters
    const taskId = request.params.id;
    // with mongoDB function deleted the task
    const deletedTask = await taskModel.findOneAndDelete({ _id: taskId, user: request.user._id });
    //check is deleted task is returned or null
    if (!deletedTask) {
      return response.status(404).json({
        message: "Task not found or already deleted"
      });
    }

    response.json({
      message: "Task deleted successfully",
      deletedTask //deleted task details
    });
  } catch (err) {
    // error handling 
    response.status(400).json({
      error: err.message || "Something went wrong"
    });
  }
});

module.exports=TaskRouter;
