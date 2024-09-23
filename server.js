import { app } from './app.js';
import { connectDB } from './data/database.js';

connectDB();

app.listen(process.env.port, () => {
  console.log('Server is running on port 4000');
});
