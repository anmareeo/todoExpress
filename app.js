

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require ('dotenv').config()
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const cors = require('cors')
const MongoClient = require ('mongodb').MongoClient
const itemsRouter = require ('./routes/api/v1/items')


const url = process.env.MONGO_CONNECTION
const client = new MongoClient(url, { useUnifiedTopology: true, useNewUrlParser: true })
let app = client.connect ()
.then (connection => {



const app = express();
app.locals.collectionItems = connection.db ('toDoList').collection ('items')
// view engine setup
app.use(cors())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'react')));
app.use('/api/v1/items', itemsRouter)

// app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//close database on exit
process.on('SIGINT',() =>{

  client.close()
  process.exit()
})
return app
})
.catch (err =>{
console.log (err)
  process.exit()

})
module.exports = app;
