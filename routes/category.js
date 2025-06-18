const router = require('express').Router();
const e = require('express');
const { Category } = require('../models/category')
const { body } = require('express-validator');


router.post('/add-categories' , async (req, res)=>{
 try {
     var categories = req.body
      console.log(categories)
      await Category.insertMeny(categories)
     console.log(categories)

    return res.json({msg:"done"});
 } catch (error) {
    return res.json({e:error});
 }
});




module.exports = router;