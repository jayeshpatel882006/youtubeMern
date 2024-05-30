import mongoose from "mongoose"

const subTodoSchema = new mongoose.Schema({
    title:{
      type:String,
      required : true,
    },
    complited:{
      type:Boolean,
      default:false,
    },
    content:{
        type:String,
        required:true
    }
    
},{timestamps:true});

export const SubTodo = mongoose.model("SubTodo",subTodoSchema);