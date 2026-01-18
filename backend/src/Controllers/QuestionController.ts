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
const input=sampleInput;
const output=sampleOutput;
const user=(req as any).user;
const userId=user.userId;
const makeQuestion=await questionModel.create({
    userId:userId,
    title,
    description,
    functionSignature,
    constraint,
    sampleInput,
    sampleOutput,
    difficulty,
    topic,
});
return res.status(200).json({
    message:"question created successfully",
    data:makeQuestion,
});
}

export const showQuestion=async(req:Request,res:Response)=>{
    const showQuestion=await questionModel.find();
    return res.status(200).json({
        message:"all Question",
        data:showQuestion,
    });
}



export const particularQuestion=async(req:Request,res:Response)=>{
    const {id}=req.body;
    if(!id){
        return res.status(401).json({
            message:"provide proper detail",
        });
    }
    const checkIt=await questionModel.findById(id);
    if(!checkIt){
        return res.status(403).json({
            message:"not found",
        });
    }
    return res.status(200).json({
        message:"got particular problem",
        data:checkIt,
    });
}