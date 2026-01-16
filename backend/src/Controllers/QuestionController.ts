import {Request,Response} from 'express';
import { questionModel } from '../models/QuestionModel';


export const allQuestion=async(req:Request,res:Response)=>{
    const question=await questionModel.find();
    return res.status(200).json({
        message:"list of all question",
        data:question,
    })
}


export const adminaddQuestion=async(req:Request,res:Response)=>{
const {title,description,functionSignature,constraint,sampleInput,sampleOutput,difficulty,topic}=req.body;
if(!title || !description || !functionSignature || !constraint || !sampleInput || !sampleOutput || !difficulty || !topic){
    return res.status(401).json({
        message:"fill details properly",
    });
}
const checkIt=await questionModel.findOne({title,functionSignature});
if(checkIt){
    return res.status(400).json({
        message:"already have same question",
    });
}
const input=JSON.parse(sampleInput);
const output=JSON.parse(sampleOutput);
const user=(req as any).user;
const userId=user.userId;
const makeQuestion=await questionModel.create({
    userId:userId,
    title,
    description,
    functionSignature,
    constraint,
    sampleInput:input,
    sampleOutput:output,
    difficulty,
    topic,
});
return res.status(200).json({
    message:"question created successfully",
    data:makeQuestion,
});
}