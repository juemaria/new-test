const express = require('express');
const routes = express.Router()
routes.get('/',(req,res,next) =>{
  res.status(200).json({
    message:("requesting")
  });
});
routes.post('/',(req,res,next) =>{
  res.status(300).json({
    message:("posting")
  });
});
routes.get('/:Pid',(req,res,next)=>
{
  const id = req.params.Pid;
  if (id === '1')
  {
  res.status(200).json({
    message: 'product id request'
  });
}
else {
  {
    res.status(200).json({
      message:'item not found'
    });
  }
}

});
routes.post('/:Pid',(req,res,next)=>{
  const id = req.params.Pid;
  if(id === '2')
  {
    res.status(200).json({
      message:'product post request'
    });
  }
    else {
        res.status(200).json({
          message:'not found'
        });
      }
});
routes.patch('/:Pid',(req,res,next) =>{
  res.status(201).json({
    message:'modified'
  });
});
routes.delete('/:Pid',(req,res,next)=>{
  const id = req.params.Pid;
  if (id === 4)
  {
res.status(200).json({
  message:'item deleted'
});
  }
  else {
    res.status(200).json({
        message:'deleted item not found'
      });
}
});


module.exports = routes;
