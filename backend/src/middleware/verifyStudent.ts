import {Request,Response,NextFunction} from 'express';
const verifyStudent=async(req:Request,res:Response,next:NextFunction)=>{
const user=(req as any).user;
if(!user || user.role!== 'STUDENT'){
    return res.status(404).json({
        message:"not have access",
    });
}
next();
}

export default verifyStudent;