const { default: mongoose } = require("mongoose");

const todoModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // Ensures title is always provided
    },
    description: {
      type: String,
      required: true, // Ensures content is always provided
    },
    time:{
        type:String,
        required:true
    },

    date: { type: Date, default: Date.now },
  },    
  {
    versionKey: "__v", // Explicitly sets the version key field name (default is '__v')
  }
);

export const TodoData = mongoose.models.todos || mongoose.model("todos", todoModel);
