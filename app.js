// const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
// const logger = require('morgan');
require('express-async-errors');
require('dotenv').config();

// security packages 
const cors = require('cors');
const helmet = require('helmet');
const rateLimiter = require('express-rate-limit');

const authRouter = require('./routes/auth');
const jobRouter = require('./routes/job');
const {
  notFoundMiddleware,
  errorHandlerMiddleware,
  authenticationMiddleware
} = require('./middlewares');
const app = express();

app.use(rateLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
}))
app.use(helmet());

const corsOptions = process.env.NODE_ENV == 'production' ? {} : {credentials: true, origin: 'http://localhost:4200'} ;
app.use(cors(corsOptions))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(logger('dev'));


app.use('/jobapi/auth', authRouter);
app.use('/jobapi/job',authenticationMiddleware, jobRouter);

if (process.env.NODE_ENV == 'production') {
  console.log('Application running on production mode.');
  app.use(express.static(path.join(__dirname, 'public')));
  app.get('*', (req, res) => {
    console.log('Hi, Wild cart route');
    res.status(200).sendFile(path.join(__dirname, 'public/index.html'))
  })
}else
  console.log('Application running on development mode.');

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware)

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
