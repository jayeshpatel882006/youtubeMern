import mongoose from "mongoose"

const todoSchema = new mongoose.Schema({
    title:{
      type:String,
      required : true,
    },
    complited:{
      type:Boolean,
      default:false,
    },
    subTodos:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"SubTodo"
        }
    ]
},{timestamps:true});

export const Todo = mongoose.model("Todo",todoSchema);