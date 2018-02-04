const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');

const OrderInstance = require('../models/ordersc');
//we are able to check the product exist or not,create object
const PInstance = require('../models/productsc');


//get the details of product.

routes.get('/',(req,res,next) =>{
OrderInstance.find()
  .select('product quantity _id')
  .exec()
   .then(doc =>
  {
    console.log(doc);
    res.status(200).json({
     message:'get the  order details of product',
   response: {
    count: doc.length,
    order : doc.map(doc => {
      return {
      _id: doc.id,
      product: doc.product,
      quantity: doc.quantity,
      request:
      {
        type: 'GET',
        Url : "http://localhost:3000/order/"+doc.id
      }
    }
  })
}
});
})
.catch(err => console.log(err));
});
// posting a data
routes.post('/',(req,res,next) =>{
  PInstance.findById(req.body.productId)
  .then(res => {
    if(!res)
    {
    return res.status(200).json({
        message: "not found"
      });
    }
    const order = new OrderInstance({
    _id: mongoose.Types.ObjectId(),
        productId: req.body.productId,
        quantity: req.body.quantity
      });
      return order.save();
  })
 .then(doc => {
    console.log(doc);
    res.status(300).json({
      message:("order is posting"),
      createOrder:{
        productId: doc.productId,
        quantity: doc.quantity,
        _id : doc.id,
      },
        request:
        {
          Url : "http://localhost:3000/order/"+doc.id
        }
    });
  })
  .catch(err => {
    console.log(err);
  res.status(400).json({
  error: err
});
});
});

// get the data based on id
routes.get('/:Oid',(req,res,next)  =>
{
  const id = req.params.Oid;
OrderInstance.findById(id)
.select('product quantity _id')
.exec()
.then(doc => {
  console.log("from database",doc);
if(doc) {
  res.status(200).json({
    _id: doc.id,
    product: doc.product,
    quantity: doc.quantity
  });
}
else {
  {
    res.status(404).json({message:'no item found this id'})
  }
}
})
.catch(err =>{
  console.log(err);
  res.status(500).json({error: err});
});
});

routes.patch('/:Oid',(req,res,next) =>{
  const id = req.params.Oid;
  const updates = {};
  for (const ops of req.body) {
    updates[ops.newname] = ops.newvalue;
  }
OrderInstance.update({ _id: id },{ $set: updates })
.exec()
.then(doc => {
  console.log(doc);
  res.status(200).json({
    message:'updated',
    url:'http://localhost:3000/order/' +id
  });
  })
.catch( err => {
  res.status(400).json({error : err})
})
});

routes.delete('/:Oid',(req,res,next) =>{
   const id = req.params.Oid;
   OrderInstance.remove({ _id: id })
  .exec()
 .then(doc => {
    res.status(200).json({
        message:'Deleted the product',
        url:'http://localhost:3000/order/'
    });
    })
 .catch(err => {
    console.log(err);
    res.status(500).json({
    error: err
      });
    });
});


module.exports = routes;
//.then(result => {
  // if (!result) {
  //   return res.status(400).json({
  //     message: 'id not found'
  //   });
  // }

//return order
