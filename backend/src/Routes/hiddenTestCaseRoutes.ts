import {Router} from 'express';
const hiddentestRoutes=Router();
import verifyToken from '../middleware/verifyToken';
import verifyAdmin from '../middleware/verifyAdmin';

import { AddHiddenTestCase } from '../Controllers/AddHiddenTestCaseController';

hiddentestRoutes.post("/addHiddenTestCase",verifyToken,verifyAdmin,AddHiddenTestCase);


export default hiddentestRoutes;