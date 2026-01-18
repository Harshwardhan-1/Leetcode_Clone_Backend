import {Request,Response} from 'express';
import { questionModel } from '../models/QuestionModel';
import { executeCode } from '../utils/executeCode';
import { hiddenModel } from '../models/HiddenTestCaseModel';
import { encodeXText } from 'nodemailer/lib/shared';
export const runCode=async(req:Request,res:Response)=>{
const {id,language,userCode,title}=req.body; 
if(!id || !language || !userCode || !title){
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
const hiddenTestCase=await hiddenModel.find({title});
const allTestCases=[
    {input:problem.sampleInput,expectedOutput:problem.sampleOutput},
    ...hiddenTestCase.map(tc=>({
        input:tc.sampleInput,
        expectedOutput:tc.sampleOutput,
    }))
];
let allPassed=true;
const results:any[]=[];

for(let testcase of allTestCases){
    let inputStr=Array.isArray(testcase.input)?testcase.input.join("\n"):testcase.input;
    if(typeof inputStr === 'string' && inputStr.startsWith('[')) {
    inputStr = inputStr.replace(/[\[\]\s]/g, '').split(',').join('\n');
}

    
try {
const output=await executeCode(language,userCode,inputStr);
const isAccepted=output.trim()===String(testcase.expectedOutput).trim();
if(!isAccepted) allPassed=false;
  results.push({
    input: testcase.input,
      expectedOutput: testcase.expectedOutput,
      yourOutput:output.trim(),
      status: isAccepted ? "Accepted" : "Wrong Answer"
  });
}catch(err){
    allPassed=false;results.push({
        input: testcase.input,
        yourOutput: "Error",
        expectedOutput: testcase.expectedOutput,
        status: "Runtime Error",
      });
}
}
res.json({
    status:allPassed?"Accepted":"Wrong Answer",
    results
});
}