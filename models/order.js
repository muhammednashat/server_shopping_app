const {Schema, model} = require('mongoose')

const orderSchema = Schema({
    userId:String,
    date:Date,
    status:String,
    totalAmount:Number,
    quantity:Number,
    shippingAddress:String,
    deliveryMethod:String,
    items:{type:[Object] },
  
});

module.exports.Order = model('Order',orderSchema);
