const router = require('express').Router();
const { Category } = require('../models/category')

router.post('/add-category' , async (req, res)=>{
 try {
     var category = Category({...req.body})
      console.log(category)
      
     category =  await category.save()
     console.log(category)

    return res.json({msg:"done"});
 } catch (error) {
    return res.json({e:error});
 }
});

router.get('/get-categories-by-category', async (req, res)=> {
   try {
      const {mainCategory} = req.body
       const query = {"mainCategory":mainCategory};
      const categories = await Category.find(query)
      console.log(categories)
         return res.json(categories);
   } catch (error) {
         return res.json({e:error});
   }
});


router.get('/get-categories', async (req, res)=> {
   try {
      const categories = await Category.find()
      console.log(categories)
         return res.json({msg:"done"});
   } catch (error) {
         return res.json({e:error});
   }
})




router.post('/add-categories' , async (req, res)=>{
 try {
     var categories = req.body
      console.log(categories)
        await Category.deleteMany({}); 
      await Category.insertMany(categories)
     console.log(categories)

    return res.json({msg:"done"});
 } catch (error) {
    return res.json({e:error});
 }
});




module.exports = router;