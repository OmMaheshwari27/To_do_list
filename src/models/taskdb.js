const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        ref:"user",
        unique: true,
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
        default:"pending",
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