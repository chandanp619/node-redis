var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var blogRouter = require('./routes/insertBlog');

var redis = require("redis");


var app = express();
// 
var DBURL1 = 'mongodb://dbacp:hobykv2Co3usLXia@clusternode-shard-00-00-brgfz.mongodb.net:27017,clusternode-shard-00-01-brgfz.mongodb.net:27017,clusternode-shard-00-02-brgfz.mongodb.net:27017/redisTest?ssl=true&replicaSet=ClusterNode-shard-0&authSource=admin&retryWrites=true';
var DBURL2 = 'mongodb+srv://dbacp:hobykv2Co3usLXia@clusternode-brgfz.mongodb.net/redisTest';
const db = mongoose.connect(DBURL1, { useNewUrlParser: true } ,function(err,data){
  if(err) console.log(err);
});






// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/insertBlog',blogRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  var client = redis.createClient();
  client.set("status","");
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
