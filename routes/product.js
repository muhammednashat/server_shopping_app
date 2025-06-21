// express , mongoos, model, controller
//

// create a router to handling routes.
const router = require('express').Router();
const { Product } = require('../models/product')
  const path = require("path");
    const fs = require("fs");

router.get('/sale-products', async (req, res) => {
  try {
    const query = { "isOnSale": true };
    const products = await Product.find(query)

    return res.json(products)
  } catch (error) {
    return res.json({ error: error });
  }
});



router.get('/new-products', async (req, res) => {
  try {
    const query = { "isnew": true };
    var products = await Product.find(query)
    console.log(products)
    return res.json(products);
  } catch (error) {
    return res.json({ error: error });
  }
})


router.post('/update-products', async (req, res) => {
 try {
  const products = await Product.find({"mainCategory":"Women", "subCategory":"Tops"});
  products.forEach(async product =>  {
    const newImageUrl = 
      'https://raw.githubusercontent.com/muhammednashat/images_shopping_app/main/girl.jpg'
   await Product.updateOne({_id:product._id} ,{ $set: { imageUrl: newImageUrl } })
    
  });
  return res.json(products);
} catch (error) {
    return res.json({ error });
 }
})


router.get('/products-by-category', async (req, res) => {
  try {
    const { mainCategory , subCategory } = req.body;
    console.log("Category:", mainCategory , "subCategory: ",subCategory );
    const products = await Product.find({ mainCategory, subCategory });
    return res.json(products);
  } catch (error) {
    return res.json({ error });
  }
});


router.post('/add-all-products', async (req, res) => {
  try {
    const dataPath = path.join(__dirname, "data", "products.json");
    const products = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    await Product.deleteMany({}); 
    await Product.insertMany(products);
    console.log('✅ Upload completed');
    return res.json({"msg":"done"})
  } catch (error) {
  return res.json({ error: error });
  }
});

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