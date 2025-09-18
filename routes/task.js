import express from 'express';
import {
  newTask,
  getAllTask,
  updateTask,
  deleteTask,
} from '../controllers/task.js';
import { isAuthenticated } from '../middlewares/auth.js';
import { cookieRefresher } from '../utils/features.js';

const router = express.Router();
router.post('/new', isAuthenticated, cookieRefresher, newTask);
router.get('/all', isAuthenticated, getAllTask);
router
  .route('/:id')
  .put(isAuthenticated, cookieRefresher, updateTask)
  .delete(isAuthenticated, cookieRefresher, deleteTask);

export default router;
