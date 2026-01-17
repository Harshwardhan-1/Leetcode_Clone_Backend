import mongoose from "mongoose";
const submissionSchema=new mongoose.Schema({
    userId:{
        type:String,
        ref:"user",
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    difficulty:{
        type:String,
        required:true,
    },
    topic:{
        type:String,
        required:true,
    },
})


export const submitModel=mongoose.model('submission',submissionSchema);