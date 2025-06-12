// express , mongoos, model, controller
//

// create a router to handling routes.
const router = require('express').Router();
const {Product} = require('../models/product')

router.post('/add-product',async (req,res) => {
    try {
    console.log(req.body)
    const {imageUrl, brandName} = req.body
     var product = Product({...req.body})
  try {
   product = await product.save()
     return res.json(product);
    
    
  } catch (error) {
    return res.json({error:"error2 "}) ;   
    
  }

    //  console.log(product)
    
 return res.json({msg:"done2"});
    } catch (error) {
    return res.json({error:"error"}) ;   
    }
})


// export router
//Every JavaScript file in Node.js is treated as a module behind the scenes.
//module refers to the current file as a module in Node.js.
module.exports = router;