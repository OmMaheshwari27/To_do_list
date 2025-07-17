const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    // only three status are allowed, if other then error will be displayed
    enum: {
      values: ["pending", "in-progress", "complete"],
      message: `{VALUE} is not a valid status`,
    },
    //default status is pending
    default: "pending",
  },
  // storing user details to match the task of each user
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task_Users",
    required: true
  }
},
  { timestamps: true }
).pre("save", async function (next) {
  const Task = mongoose.model("Taskdb");

  // Only check for duplicates when creating a new task
  if (this.isNew || this.isModified("title")) {
    const existing = await Task.findOne({ title: this.title });
    if (existing) {
      return next(new Error("Task with this title already exists"));
    }
  }
  next();
});


const Taskdb = mongoose.model("Taskdb", taskSchema);
module.exports = Taskdb;