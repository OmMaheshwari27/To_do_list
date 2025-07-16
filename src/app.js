const express = require("express");
const dotenv = require("dotenv");
const connectDB=require("./config/database");
//const taskModel = require("./models/taskdb");

dotenv.config();
connectDB();

const app = express();
  // it will act as a middleware for all the api request where
  // the data coming in the form of JSON will be convert to JavaScript Object  
app.use(express.json());

//importing routers
const AuthRouter=require("./routers/auth");
const TaskRouter=require("./routers/task");

//request. will be router to router and its handler
app.use("/", AuthRouter);
app.use("/", TaskRouter);






// app.post("/task", async (request, response) => {
//     try {
//         const { title, description, status } = request.body;
//         const task = new taskModel({
//             title,
//             description,
//             status,
//         });

//         await task.save();

//         response.send("welcome");
//     }
//     catch (err) {
//         response.status.send("some error is there : " + err.message);
//     }
// });
// app.get("/task", async (request, response) => {
//     try {
//         const tasks = await taskModel.find({});
//         if(!tasks || tasks.length==0){
//             return response.status(404).send("no task found for you");
//         }
//         response.json({
//             message:"here your all task",
//             tasks,
//         })
//     }
//     catch (err) {
//         response.status(400).send("some error is there : " + err.message);
//     }
// });

// app.get("/task/:id", async (request,response)=>{
//     const id=request.params.id;
//     const tasks= await taskModel.findById({_id:id});
//     try{
//         if(!tasks || tasks.length==0){
//             return response.status(404).send("no task found for you");
//         }
//         response.json({
//             message:"here your all task",
//             tasks,
//         })
//     }
//     catch (err) {
//         response.status(400).send("some error is there : " + err.message);
//     }
// })




app.listen("8000", () => {
    console.log("server is running on port 8000");
})