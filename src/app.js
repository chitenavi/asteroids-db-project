import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import jwtAuth from './middlewares/jwtAuth';

import authRouter from './routes/api/auth';
import asteroidRouter from './routes/api/asteroid';
import userRouter from './routes/api/user';
import customerRouter from './routes/api/customer';
import globalErrorHandler from './middlewares/globalErrorHandler';

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/asteroid', jwtAuth(), asteroidRouter);
app.use('/api/v1/user', jwtAuth(), userRouter);
app.use('/api/v1/customer', jwtAuth(), customerRouter);

// Global error handler
app.use(globalErrorHandler());

export default app;
