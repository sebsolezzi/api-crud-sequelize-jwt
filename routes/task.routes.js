import {Router} from 'express'
import { echo } from '../controllers/tasks.controller.js';
import { authToken } from '../middlewares/authjwt.js';

const taskRoutes = Router();

taskRoutes.get('/gettask',authToken,echo)
taskRoutes.post('/createtask',echo)
taskRoutes.delete('/createtask',echo)
taskRoutes.put('/createtask',echo)


export default taskRoutes;