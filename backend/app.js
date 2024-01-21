import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// error handler middleware
import errorMiddleware from './middlewares/error.js';

import engrAuth from './routes/engrAuth.js';
import empAuth from './routes/empAuth.js';
import index from './routes/index.js';
import job from './routes/job.js';
import proposal from './routes/proposal.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'https://engi-link.onrender.com',
  methods: ['DELETE', 'POST', 'GET', 'PUT', 'OPTIONS', 'HEAD'],
  credentials: true
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://engi-link.onrender.com');
  res.header('Access-Control-Allow-Methods', 'DELETE, POST, GET, PUT, OPTIONS, HEAD');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/', (req, res) => {
  res.send('Welcome to Backend');
});

app.use('/api/v1', engrAuth);
app.use('/api/v1', empAuth);
app.use('/api/v1', index);
app.use('/api/v1', job);
app.use('/api/v1', proposal);
app.use(errorMiddleware);

export default app;
