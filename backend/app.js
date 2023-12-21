import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// error handler middleware
import errorMiddleware from './middlewares/error.js';

import engrAuth from './routes/engrAuth.js';
import empAuth from './routes/empAuth.js';
import index from './routes/index.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/v1', engrAuth);
app.use('/api/v1', empAuth);
app.use('/api/v1', index);

app.use(errorMiddleware);
export default app;
