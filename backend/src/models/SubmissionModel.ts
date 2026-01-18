import mongoose from 'mongoose';
const submitSchema=new mongoose.Schema({
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
    userCode:{
        type:String,
        required:true,
    },
    points:{
        type:Number,
        required:true,
    },
    count:{
        type:Number,
        required:true,
    },
})

export const submitCodeModel=mongoose.model('submit',submitSchema);