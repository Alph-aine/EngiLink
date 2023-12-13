import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// error handler middleware
import errorMiddleware from './middlewares/error.js';

import auth from './routes/auth.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(errorMiddleware);

app.use(auth);

export default app;
