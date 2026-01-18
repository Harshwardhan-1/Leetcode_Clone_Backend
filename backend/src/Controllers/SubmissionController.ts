import {Request,Response} from 'express';
import { submitCodeModel } from '../models/SubmissionModel';
export const submitUserCode=async(req:Request,res:Response)=>{
    const {id,title,description,userCode}=req.body;
    if(!id || !title || !description || !userCode){
        return res.status(401).json({
            message:"provide proper detail",
        });
    }
    const user=(req as any).user;
    const userId=user.userId;
    const findIt=await submitCodeModel.findOne({userId,title});
    if(!findIt){
        const createIt=await submitCodeModel.create({
            userId:userId,
            title,
            description,
            userCode,
            points:10,
            count:1,
        });
        return res.status(200).json({
            message:"successfully submitted",
            data:createIt,
        });
    }else{
        if(findIt.count>=3){
            return res.status(401).json({
                message:"you already submitted the code 3 times try some other question",
            });
        }else{
            findIt.points+=10,
            findIt.count+=1,
            await findIt.save();
            return res.status(200).json({
                message:"successfully submitted",
                data:findIt,
            })
        }
    }
}



export const seeSubmission=async(req:Request,res:Response)=>{
const user=(req as any).user;
const userId=user.userId;
const checkIt=await submitCodeModel.find({userId});
if(checkIt.length===0){
    return res.status(401).json({
        message:"no submission yet",
    });
}
return res.status(200).json({
    message:"here are your submission",
    data:checkIt,
});
}