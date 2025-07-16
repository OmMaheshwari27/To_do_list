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
        enum: {
            values: ["pending", "in-progress", "complete"],
            message: `{VALUE} is not a valid status`,
        }
    }
},
    { timestamps: true }
);

const Taskdb = mongoose.model("Taskdb", taskSchema);
module.exports = Taskdb;