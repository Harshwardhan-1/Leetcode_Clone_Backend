import {Router} from 'express';
const runCodeRoutes=Router();
import verifyToken from '../middleware/verifyToken';
import verifyStudent from '../middleware/verifyStudent';

import { runCode } from '../Controllers/RunCodeController';

runCodeRoutes.post('/CheckRunCode',verifyToken,verifyStudent,runCode);

export default runCodeRoutes;