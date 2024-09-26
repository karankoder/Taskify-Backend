import express from 'express';
import { User } from '../models/user.js';
import {
  getAllUsers,
  createNewUser,
  userLogin,
  userProfile,
  logout,
} from '../controllers/user.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.get('/all', getAllUsers);
router.post('/new', createNewUser);
router.post('/login', userLogin);
router.get('/me', isAuthenticated, userProfile);
router.get('/logout', logout);

export default router;
