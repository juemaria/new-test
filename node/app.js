const express = require('express');
const app = express()
const productsroute = require('./api/product.js,order.js');

app.use('/serve',productsroute);

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
