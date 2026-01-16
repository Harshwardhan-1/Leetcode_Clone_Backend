import {Router} from 'express';
const addQuestion=Router();
import verifyToken from '../middleware/verifyToken';
import verifyAdmin from '../middleware/verifyAdmin';
import { adminaddQuestion,allQuestion } from '../Controllers/QuestionController';


addQuestion.get('/allQuestion',verifyToken,verifyAdmin,allQuestion);
addQuestion.post('/addQuestion',verifyToken,verifyAdmin,adminaddQuestion);
export default addQuestion;