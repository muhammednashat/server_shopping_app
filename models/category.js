const {Schema, model} = require('mongoose')

const categorySchema = Schema({

    "imageUrl":String,
    "category":String,
    "mainCategory":String,
    "subCategory":String,
   
});


module.exports.Category = model('Category',categorySchema)