import mongoose from "mongoose";
const questionSchema=new mongoose.Schema({
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
    functionSignature:{
        type:String,
        required:true,
    },
    constraint:{
        type:String,
        required:true,
    },
    sampleInput:{
        type:Array,
        required:true,
    },
    sampleOutput:{
        type:Array,
        required:true,
    },
    difficulty:{
        type:String,
        enum:["Easy","Medium","Hard"],
        required:true,
    },
    topic:{
        type:String,
        required:true,
    },
})

export const questionModel=mongoose.model('addquestion',questionSchema);