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

for (let testcase of allTestCases) {
    // Convert input to string
    let inputStr = '';

    // Agar array format me aaya
    if (Array.isArray(testcase.input)) {
        inputStr = testcase.input.join('\n');
    } else if (typeof testcase.input === 'string') {
        // Agar string me brackets hai "[1,2,3,4]"
        if (testcase.input.startsWith('[')) {
            inputStr = testcase.input
                .replace(/[\[\]\s]/g, '') // remove brackets and spaces
                .split(',')
                .join('\n'); // convert to line by line
        } else {
            inputStr = testcase.input;
        }
    }

    try {
        const output = await executeCode(language, userCode, inputStr);

        const expected = String(testcase.expectedOutput).trim();
        const actual = output.trim();

        const isAccepted = actual === expected;
        if (!isAccepted) allPassed = false;

        results.push({
            input: testcase.input,
            expectedOutput: testcase.expectedOutput,
            yourOutput: actual,
            status: isAccepted ? 'Accepted' : 'Wrong Answer',
        });
    } catch (err) {
        allPassed = false;
        results.push({
            input: testcase.input,
            expectedOutput: testcase.expectedOutput,
            yourOutput: 'Error',
            status: 'Runtime Error',
        });
    }
}
res.json({
    status:allPassed?"Accepted":"Wrong Answer",
    results
});
}