const router = require('express').Router();
const { Order } = require('../models/order');
const { Cart } = require('../models/cart');


const { Product } = require('../models/product')
const MyResponse = require('../models/responses/response')
const CartResponse = require('../models/responses/cart_response')
const ItemsResponse = require('../models/responses/cart_item_response')

async function getCartItems(cart) {

  try {
    var totalPrice = 0.0
    var productIds = cart.items.map((element) => element.productId);
    const products = await Product.find({ "_id": { $in: productIds } });


    const items = productIds.map((id) => {
      const product = products.find((element) => element._id == id)
      const cartItem = cart.items.find((item) => item.productId == id);
      const quantity = cartItem.quantity;
      const price = quantity * product.salePrice
      totalPrice += price
      return new ItemsResponse(cartItem._id, quantity, product.name, product.imageUrl, product.salePrice, price, cartItem.size);
    });
    console.log("======================");
    console.log(items);
    console.log("======================");
    return items
  } catch (error) {
    return null;
  }



}

function buildNewOrder(userCart) {

  const items = getCartItems(userCart);

  console.log(items);


  const date = new Date();
  const status = "Delivered";
  const userId = userCart.userId;
  const quantity = 12;
  const shippingAddress = "";
  const deliveryMethod = "";
  console.log("re23");

  const newOrder = new Order({
    date: date,
    status: status,
    shippingAddress: shippingAddress,
    userId: userId,
    quantity: quantity,
    deliveryMethod: deliveryMethod,
    items: items
  });
  console.log("re2");

  return newOrder;
}




router.post('/submet-order', async (req, res) => {
  try {
    const userId = req.body;
    const userCart = await Cart.findOne(userId)

    const newOrder = buildNewOrder(userCart)

    try {
      const { _id } = await newOrder.save()
      // await Cart.deleteOne(userId)
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