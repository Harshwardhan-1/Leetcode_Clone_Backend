import {Router} from 'express';
const addQuestion=Router();
import verifyToken from '../middleware/verifyToken';
import verifyAdmin from '../middleware/verifyAdmin';
import verifyStudent from '../middleware/verifyStudent';
import { adminaddQuestion,allQuestion,showQuestion} from '../Controllers/QuestionController';


addQuestion.get('/allQuestion',verifyToken,verifyAdmin,allQuestion);
addQuestion.post('/addQuestion',verifyToken,verifyAdmin,adminaddQuestion);
addQuestion.get('/showQuestion',verifyToken,verifyStudent,showQuestion)
export default addQuestion;