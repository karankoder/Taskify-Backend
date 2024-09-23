import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.js';

const app = express();

app.use(express.json());
app.use('/users', userRouter);

mongoose
  .connect('mongodb://127.0.0.1:27017', {
    dbName: 'Taskify',
  })
  .then(() => {
    console.log('Database Connected');
  })
  .catch((err) => {
    console.log('Database Connection failed');
    console.log(err);
  });

app.get('/', (req, res) => {
  res.send('Server is working');
});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
