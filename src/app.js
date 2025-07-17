const express = require("express");
const dotenv = require("dotenv");
const connectDB=require("./config/database");
const cookieParser = require("cookie-parser");
//const taskModel = require("./models/taskdb");

dotenv.config();
connectDB();

const app = express();
  // it will act as a middleware for all the api request where
  // the data coming in the form of JSON will be convert to JavaScript Object  
app.use(express.json());
app.use(cookieParser());

//importing routers
const AuthRouter=require("./routers/auth");
const TaskRouter=require("./routers/task");

//request. will be router to router and its handler
app.use("/", AuthRouter);
app.use("/", TaskRouter);


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});