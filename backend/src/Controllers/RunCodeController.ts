import {Request,Response} from 'express';
import { questionModel } from '../models/QuestionModel';
import { executeCode } from '../utils/executeCode';
export const runCode=async(req:Request,res:Response)=>{
const {id,language,userCode}=req.body;
if(!id || !language || !userCode){
    return res.status(401).json({
        message:"somehting went wrong",
    });
}
const problem=await questionModel.findById(id);
if(!problem){
    return res.status(401).json({
        message:"cannot by id",
    });
}
const input=problem.sampleInput;
const output=await executeCode(language,userCode,JSON.stringify(input));

const yourOutput=output.trim();
const sampleOutput=String(problem.sampleOutput).trim();
res.json({
    sampleInput: input,
    sampleOutput: problem.sampleOutput,
    yourOutput: output,
    status:yourOutput===sampleOutput?"Accepted":"Wrong Answer",
});

}