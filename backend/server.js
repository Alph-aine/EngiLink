import connectDB from './config/db.js';
import app from './app.js';
import dotenv from 'dotenv';

dotenv.config({ path: './config/.env' });
console.log(`${process.env.MONGODB_URI}`);
connectDB();

const server = app.listen(process.env.PORT, () => {
  console.log(`server running on ${process.env.PORT}`);
});

// Handle uncaught exceptions.
process.on('uncaughtException', (err) => {
  console.log('Shutting server down due to uncaught exception...');
  console.log(`Error: ${err.message}`);

  // Close server.
  process.exit(1);
});

// Handle unhandled promise rejections.
process.on('unhandledRejection', err => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process.
  console.log('Shutting server down due to unhandled promise rejections...');
  server.close(() => process.exit(1));
});
