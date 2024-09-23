import express from 'express';
import { User } from '../models/user.js';

const router = express.Router();

router.get('/all', async (req, res) => {
  const users = await User.find({});
  res.json({
    success: true,
    users,
  });
});

router.post('/new', async (req, res) => {
  const { name, email, password } = req.body;

  await User.create({
    name,
    email,
    password,
  });

  res.json({
    success: true,
    message: 'Registered Successfully',
  });
});

export default router;
