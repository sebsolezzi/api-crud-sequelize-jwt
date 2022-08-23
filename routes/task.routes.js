import {Router} from 'express'
import { getTasks,createTask, deleteTask, updateTask } from '../controllers/tasks.controller.js';
import { checkToken } from '../middlewares/authjwt.js';

const taskRoutes = Router();

taskRoutes.get('/gettasks',checkToken,getTasks);
taskRoutes.post('/createtask',checkToken,createTask);
taskRoutes.delete('/deletetask/:id',checkToken,deleteTask);
taskRoutes.put('/updatetask/:id',checkToken,updateTask);




export default taskRoutes;