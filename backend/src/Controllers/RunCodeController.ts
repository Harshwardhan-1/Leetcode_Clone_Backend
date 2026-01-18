import {Request,Response} from 'express';
import { hiddenModel } from '../models/HiddenTestCaseModel';
import { executeCode } from '../utils/executeCode';
export const runUserCode=async(req:Request,res:Response)=>{
const {id,title,language,userCode}=req.body;
if(!id || !title || !language || !userCode){
    return res.status(401).json({
        message:"provide proper detail",
    });
}
const hiddenTests=await hiddenModel.find({title});
if(hiddenTests.length=== 0){
    return res.status(400).json({
    message:"admin has not completely make the question and added does not hidden test case for it",
    });
}
let allPassed=true;
const testCaseResult:any[]=[];
for(let i=0;i<hiddenTests.length;i++){
    const input=String(hiddenTests[i].sampleInput).trim();
const expected=String(hiddenTests[i].sampleOutput).trim();
const output=await executeCode(language,userCode,input);

const passed=output.trim()===expected;
if(!passed)allPassed=false;
testCaseResult.push({
    input,
    expectedOutput:expected,
    userOutput:output,
    status:passed?"Passed":"Failed",
})
}
return res.status(200).json({
    message:allPassed?"all test case passed":"Some test cases failed",
    data:testCaseResult,
});
}