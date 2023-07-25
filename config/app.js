var express = require('express');
var createError = require('http-errors');
let passport = require('passport');
var cors = require('cors')

var usersRouter = require('../routes/user');
var productRouter = require('../routes/product');
var commentRouter = require('../routes/comment');

var app = express();

app.use(cors())

app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', usersRouter);
app.use('/product', productRouter);
app.use('/comment', commentRouter);

//catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log(err)
  res.status(err.status || 500);
  res.json({
    success: false,
    message: err.message
  });
});

const port = 3000; // Change this to your desired port
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

module.exports = app;