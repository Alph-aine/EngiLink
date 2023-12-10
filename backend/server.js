const app = require('./app');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config({ path: './config/.env' });
console.log(`${process.env.MONGODB_URI}`);
connectDB();

const server = app.listen(process.env.PORT, () => {
  console.log(`server running on ${process.env.PORT}`);
});
