
//import mogoose package.
const {Schema, model} = require('mongoose')

//create a schema
const productSchema = Schema({
  name:String,
  imageUrl:String,
  category:String,
  isnew: Boolean,
  isOnSale: Boolean,  
  brandName:String,
  rating:Number,
  originalPrice:Number,
  salePrice:Number,
  discount:String, 
});


// export a productSchema as a Product model
// exports.Product for coding
// for collection  at mongodb
// to allow others use it , like this require('')
module.exports.Product = model('Product',productSchema)