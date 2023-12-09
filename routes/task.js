import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { newTask , getMyTask , updateTaskStatus , deleteTask} from '../controllers/task.js';
const router = express.Router();

router.post('/new', isAuthenticated, newTask);
router.get('/my', isAuthenticated , getMyTask);
router.route('/:id').put(isAuthenticated , updateTaskStatus).delete(isAuthenticated , deleteTask);

export default router;