import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import jwtAuth from './utils/jwtAuth';

import asteroidsRouter from './routes/api/neas';
import usersRouter from './routes/api/users';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/neas', jwtAuth(), asteroidsRouter);
app.use('/api/v1/users', usersRouter);

// Global error handler
// app.use(globalErrorHandler);
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;

  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Api request, response json format
  if (req.originalUrl.startsWith('/api/v1/')) {
    res.status(err.status).json({
      status: 'fail',
      code: err.status,
      message: err.message,
    });
  }
});

export default app;
