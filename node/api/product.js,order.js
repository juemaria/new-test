const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');

const ProductInstance = require('../models/productsc');

//get the details of product.

routes.get('/',(req,res,next) =>{
ProductInstance.find()
  .select('name price _id')
  .exec()
   .then(doc =>
  {
    console.log(doc);
    res.status(200).json({
     message:'get the details of product',
   response: {
    count: doc.length,
    products : doc.map(doc => {
      return {
      _id: doc.id,
      name: doc.name,
      price: doc.price,
      request:
      {
        type: 'GET',
        Url : "http://localhost:3000/product/"+doc.id
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
const product = new ProductInstance({
_id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  product
  .save()
 .then(doc =>{
    console.log(doc);
    res.status(300).json({
      message:("data is posting"),
      createproduct: {
        name: doc.name,
        price: doc.price,
        _id : doc.id,
        request:
        {
          type: 'GET',
          Url : "http://localhost:3000/product/"+doc.id
        }
      }
})
})
  .catch(err => {
    console.log(err);
  res.status(400).json({
  error: err
  })
});
});

// get the data based on id
routes.get('/:Pid',(req,res,next)  =>
{
  const id = req.params.Pid;
ProductInstance.findById(id)
.select('name price _id')
.exec()
.then(doc => {
  console.log("from database",doc);
if(doc) {
  res.status(200).json({
    _id: doc.id,
    name: doc.name,
    price: doc.price
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
//update the data
routes.patch('/:Pid',(req,res,next) =>{
  const id = req.params.Pid;
  const updates = {};
  for (const ops of req.body) {
    updates[ops.newname] = ops.newvalue;
  }
  ProductInstance.update({ _id: id },{ $set: updates })
.exec()
.then(doc => {
  console.log(doc);
  res.status(200).json({
    message:'updated',
    url:'http://localhost:3000/product/' +id
  });
  })
.catch( err => {
  res.status(400).json({error : err})
})
});

routes.delete('/:Pid',(req,res,next) =>{
   const id = req.params.Pid;
   ProductInstance.remove({ _id: id })
  .exec()
 .then(doc => {
    res.status(200).json({
        message:'Deleted the product',
        url:'http://localhost:3000/product/'
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
