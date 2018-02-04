const express = require('express');
const app = express();
const bodyparser = require('body-parser')
const mongoose = require('mongoose')

const productsroute = require('./api/product.js,order.js');
const orderoute = require('./api/order.js');

mongoose.connect('mongodb://jue:jue@ds215208.mlab.com:15208/appdatabase');
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use('/product',productsroute);
app.use('/order',orderoute);

app.use((req,res,next) => {
  const error = new Error('An Error found');
  error.status = 404;
  next(error);
  });

app.use((error,req,res,next) =>{
  res.status(error.status||500);
  res.json({
    error:{
message:error.message
}
});
});


module.exports = app;
