import {Router} from 'express';
const submissionRoutes=Router();
import verifyToken from '../middleware/verifyToken';
import verifyStudent from '../middleware/verifyStudent';
import { submitUserCode,seeSubmission } from '../Controllers/SubmissionController';

submissionRoutes.get('/seeSubmission',verifyToken,verifyStudent,seeSubmission);
submissionRoutes.post('/submitCode',verifyToken,verifyStudent,submitUserCode);

export default submissionRoutes;