import mongoose from 'mongoose';

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: 'Taskify',
    })
    .then(() => {
      console.log('Database Connected');
    })
    .catch((err) => {
      console.log('Database Connection failed');
      console.log(err);
    });
};
