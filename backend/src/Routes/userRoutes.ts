import {Router} from 'express';
const userRouter=Router();
import { getSignUp,getAll,getSignIn,forgotPassword,otpVerify, changePassword,adminPage } from '../Controllers/userControllers';
import verifyToken from '../middleware/verifyToken';
import verifyAdmin from '../middleware/verifyAdmin';

userRouter.get("/allUser",getAll);
userRouter.post("/getSignUp",getSignUp);
userRouter.post("/getSignIn",getSignIn);
userRouter.post("/forgotPassword",verifyToken,forgotPassword);
userRouter.post("/OtpVerify",verifyToken,otpVerify);
userRouter.post("/changePassword",verifyToken,changePassword);
userRouter.post('/admin',verifyToken,verifyAdmin,adminPage)
export default userRouter;