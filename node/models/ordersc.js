const mongoose = require('mongoose');
const OrderSchema = mongoose.Schema({
_id: mongoose.Schema.Types.ObjectId,
  productId: {type: mongoose.Schema.Types.ObjectId,ref:'ProductInstance'},
  quantity: {type: Number,required: true }
});
module.exports = mongoose.model('OrderInstance',OrderSchema);
