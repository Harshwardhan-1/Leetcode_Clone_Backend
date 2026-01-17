import { hiddenModel } from "../models/HiddenTestCaseModel";
import {Request,Response} from 'express';

export const AddHiddenTestCase=async(req:Request,res:Response)=>{
const {title,sampleInput,sampleOutput}=req.body;
if(!title || !sampleInput || !sampleOutput){
    return res.status(401).json({
        message:"provide proper details",
    });
}
const findIt=await hiddenModel.findOne({title,sampleInput,sampleOutput});
if(findIt){
    return res.status(401).json({
        message:"already same input and output exist add diffrent one",
    });
}
const user=(req as any).user;
const userId=user.userId;
const input=JSON.parse(sampleInput);
const output=JSON.parse(sampleOutput);
const createIt=await hiddenModel.create({
userId:userId,
title,
sampleInput:input,
sampleOutput:output,
});
return res.status(200).json({
    message:"successfully created hidden test case",
    data:createIt,
});
}