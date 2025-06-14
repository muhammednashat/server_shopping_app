// express , mongoos, model, controller
//

// create a router to handling routes.
const router = require('express').Router();
const { Product } = require('../models/product')


router.get('/sale-products', async(req, res) =>{
try {
  const query = {"isOnSale":true};
  const products = await Product.find(query)
  console.log(products)
  return res.json(products)
} catch (error) {
    return res.json({ error: error });
}
});



router.get('/new-products', async (req, res) => {
  try {
    const query ={"isnew":true};
    var products = await Product.find(query)
    console.log(products)
    return res.status(201).json(products);

  } catch (error) {
    return res.json({ error: "error2 " });
  }
})


router.get('/add', async(req,res) =>{
   return res.status(201).json({msg:"do"});
})

router.post('/add-product', async (req, res) => {
  try {
    console.log(req.body)
   
    var product = Product({ ...req.body })
    try {
      product = await product.save()
      return res.json(product);


    } catch (error) {
      return res.json({ error: "error2 " });

    }

    //  console.log(product)

    return res.json({ msg: "done2" });
  } catch (error) {
    return res.json({ error: "error" });
  }
})


// export router
//Every JavaScript file in Node.js is treated as a module behind the scenes.
//module refers to the current file as a module in Node.js.
module.exports = router;