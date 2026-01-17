import {Router} from 'express';
const submitUserSolution=Router();
import verifyToken from '../middleware/verifyToken';
import verifyStudent from '../middleware/verifyStudent';

import { submitSolution } from '../Controllers/SubmissionController';

submitUserSolution.post('/submitSol',verifyToken,verifyStudent,submitSolution);

export default submitUserSolution;