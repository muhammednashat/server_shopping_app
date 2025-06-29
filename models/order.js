const {Schema, model} = require('mongoose')

const orderSchema = Schema({
    items:{type:[Object] , required:true},
    date:Date,
    status:String,
    totalAmount:Number,
    quantity:Number,
    shippingAddress:String,
    deliveryMethod:String,
    userId:String,
  
});

module.exports.Order = model('Order',orderSchema);
