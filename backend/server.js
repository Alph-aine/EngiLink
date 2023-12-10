import app from './app.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

dotenv.config({ path: './config/.env' });
console.log(`${process.env.MONGODB_URI}`);
connectDB();

const server = app.listen(process.env.PORT, () => {
  console.log(`server running on ${process.env.PORT}`);
});
