/* eslint-disable no-unused-vars */

const { Cart } = require('../models/cart');
const { Product } = require('../models/product')
const MyResponse = require('../models/responses/response')
const CartResponse = require('../models/responses/cart_response')
const ItemsResponse = require('../models/responses/cart_item_response')
const router = require('express').Router();

async function findCartByUserId(userId) {
    return await Cart.findOne({ "userId": userId })
}

async function getCart(userId) {
    var cart = await findCartByUserId(userId)
    if (cart == null) {
        cart = Cart({ userId });
        cart = await cart.save();
    }

    return cart;
}





router.post('/add-cart-Item', async (req, res) => {
    try {
        const { userId, productId, quantity, size } = req.body;
        var cart = await getCart(userId)
        console.log(cart)
        var items = cart.items

        items.push({
            productId,
            quantity,
            size
        })

        cart = await cart.save();
        return res.json(new MyResponse(200, "done"))

    } catch (error) {
        return res.json(new MyResponse(400, "has error"))
    }

});


async function getCartById(_id) {
    return await Cart.findOne({ _id })
}


async function getCartResponse(cart) {
    var totalPrice = 0.0
    var productIds = cart.items.map((element) => element.productId);
    const products = await Product.find({ "_id": { $in: productIds } });
    
    const items = productIds.map((id) => {
        const product = products.find((element) => element._id == id)
        const cartItem = cart.items.find((item) => item.productId == id);
        const quantity = cartItem.quantity;
        const price = quantity * product.salePrice
        totalPrice += price
        return new ItemsResponse(cartItem._id, quantity, product.name, product.imageUrl, product.salePrice, price , cartItem.size);
    });

    return new CartResponse(200, "doned", cart._id, items, totalPrice);
}


// edit this like get items cart 
router.delete('/delete-cart-item', async (req, res) => {
    try {
        const { cartId, cartItemId } = req.body;
        const cart = await getCartById(cartId)
        if (cart == null) {
            return res.json(new CartResponse(200, "no cart", 0, []));
        }
        const result = await Cart.updateOne(
            { _id: cartId },
            { $pull: { items: { _id: cartItemId } } });
        if (result.modifiedCount === 0) {
            return res.json(new CartResponse(200, "no item", 0, []));
        } else {
            const cart = await getCartById(cartId)
            const cartResponse = await getCartResponse(cart)
            console.log(cartResponse)
            return res.json(cartResponse);
        }
    } catch (error) {
        return res.json(new CartResponse(200, "error", 0, []));

    }
});



router.get('/get-cart-items', async (req, res) => {
    try {
        const { userId } = req.body;
        var cart = await findCartByUserId(userId);
        if (cart == null) {
            return res.json(new CartResponse(400, "There is no items in cart", "", []  ))
        }
        const cartResponse = await getCartResponse(cart)
        console.log(cartResponse.totalPrice);
        return res.json(cartResponse);
    } catch (error) {
        return res.json(new CartResponse(500, "Intenal server,\n try later", "", [] ));
    }
})



module.exports = router;