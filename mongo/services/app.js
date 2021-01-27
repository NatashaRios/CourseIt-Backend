const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const salesRouter = require('./routes/sales');

const passportConfig = require('./passport');
const passport = require('passport');
const session = require('express-session');

const sessionMidleware = session({
  name: 'services',
  secret: 's3rvic3s k3y',
  saveUninitialized: false,
  resave: false
})
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(sessionMidleware);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/sales', salesRouter);

module.exports = app;
