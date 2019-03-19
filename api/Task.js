const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    question: {
      type: String,
      required: true
    },
    tokenPairs: {
      type: Object,
      required: false
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: {
      createdAt: "created_at"
    }
  }
);

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
