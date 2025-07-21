const router = require('express').Router();
const { Order } = require('../models/order');
const { Cart } = require('../models/cart');


const { Product } = require('../models/product')
const MyResponse = require('../models/responses/response')
const CartResponse = require('../models/responses/cart_response')
const ItemsResponse = require('../models/responses/cart_item_response')

async function getCartItems(cart) {

  try {
    
    var productIds = cart.items.map((element) => element.productId);
    const products = await Product.find({ "_id": { $in: productIds } });
    const items = productIds.map((id) => {
      const product = products.find((element) => element._id == id)
      const cartItem = cart.items.find((item) => item.productId == id);
      const quantity = cartItem.quantity;
      const price = quantity * product.salePrice
   
      return {id:cartItem._id, 
        quantity,
        name:product.name, 
        imageUrl:product.imageUrl,
         salePrice:product.salePrice,
          price, 
        size  :cartItem.size
        
        };
    });
   
    return items
  } catch (error) {
    return null;
  }

}

async function buildNewOrder(userCart) {

  const items = await getCartItems(userCart);
  const date = new Date();
  const status = "Processing";
  const userId = userCart.userId;
  const quantity = 12;
  const totalAmount = 12.0;
  const shippingAddress = "";
  const deliveryMethod = "";

  const newOrder = new Order({
    date: date,
    status: status,
    shippingAddress: shippingAddress,
    userId: userId,
    totalAmount:totalAmount,
    quantity: quantity,
    deliveryMethod: deliveryMethod,
    items: items
  });
 console.log("====================bd==");
    console.log(newOrder);
    console.log("=================bd=====");

  return newOrder;
}




router.post('/submit-order', async (req, res) => {
  try {
    
    const userId = req.body;
    console.log(userId);

    const userCart = await Cart.findOne(userId)
    const newOrder = await buildNewOrder(userCart)
    try {
      const { _id } = await newOrder.save()
      await Cart.deleteOne(userId)
      return res.json(_id);
    } catch (error) {
      return res.json({ error });
    }

  } catch (error) {
    return res.json({ error: "fd" });
  }
})


router.get('/get-orders-by-status', async (req, res) => {
  const { userId, status } = req.body
  console.log(userId);
  console.log(status);
  const orders = await Order.find({ userId, status })

  return res.json(orders)
})


router.delete('/delete-user-cart', async (req, res) => {
  const userId = req.body
  const { deletedCount } = await Cart.deleteOne(userId)
  if (deletedCount > 0) {
    return res.json(true)
  } else {
    return res.json(false)
  }
})


module.exports = router