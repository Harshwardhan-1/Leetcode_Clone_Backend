import {Request,Response} from 'express';
import { submitModel } from '../models/UserSubmissionModel';



export const submitSolution=async(req:Request,res:Response)=>{
const user=(req as any).user;
const userId=user.userId;
const {title,description,difficulty,topic}=req.body;
if(!title || !description || !difficulty || !topic){
    return res.status(401).json({
        message:"provide proper detail",
    });
}
const makeSubmit=await submitModel.create({
    userId:userId,
    title,
    description,
    difficulty,
    topic,
});
return res.status(200).json({
    message:"successfully submitted",
    data:makeSubmit,
});
}