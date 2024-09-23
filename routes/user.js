import express from 'express';
import { User } from '../models/user.js';
import { getAllUsers, createNewUser } from '../controllers/user.js';

const router = express.Router();

router.get('/all', getAllUsers);

router.post('/new', createNewUser);

export default router;
