import mongoose from 'mongoose';

const hiddenTestSchema=new mongoose.Schema({
    userId:{
        type:String,
        ref:"user",
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    sampleInput:{
        type:String,
        required:true,
    },
    sampleOutput:{
        type:String,
        required:true,
    },
})


export const hiddenModel=mongoose.model("hidden",hiddenTestSchema);