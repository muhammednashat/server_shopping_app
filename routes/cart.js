/* eslint-disable no-unused-vars */

const { Cart } = require('../models/cart');
const { Product } = require('../models/product')
const MyResponse = require('../models/responses/response')
const CartItemsResponse = require('../models/responses/cart_response')
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
    var productIds = cart.items.map((element) => element.productId);
    const products = await Product.find({ "_id": { $in: productIds } });
    const items = productIds.map((id) => {
        const product = products.find((element) => element._id == id)
        const cartItem = cart.items.find((item) => item.productId == id);
        const quantity = cartItem.quantity;
        const price = quantity * product.salePrice
        return new ItemsResponse(cartItem._id, quantity, product.name, product.imageUrl, product.salePrice, price);
    });

    return new CartItemsResponse(200, "done", cart._id, items);
}

router.delete('/delete-cart-item', async (req, res) => {
    try {
        const { cartId, cartItemId } = req.body;
        const cart = await getCartById(cartId)
        if (cart == null) {
            return res.json(new CartItemsResponse(200, "no cart", cart._id, null));
        }
        const result = await Cart.updateOne(
            { _id: cartId },
            { $pull: { items: { _id: cartItemId } } });
        if (result.modifiedCount === 0) {
            return res.json(new CartItemsResponse(200, "no item", cart._id, null));
        } else {
            const cart = await getCartById(cartId)
            const cartResponse = await getCartResponse(cart)
            console.log(cartResponse)
            return res.json(cartResponse);
        }
    } catch (error) {
            return res.json(new CartItemsResponse(200, "error", "", null));

    }
});



router.get('/get-cart-items', async (req, res) => {
    try {
        const { userId } = req.body;
        var cart = await findCartByUserId(userId);
        if (cart == null) {
            return res.json(new CartItemsResponse(200, "no items", cart._id, null))
        }
        const cartResponse = await getCartResponse(cart)
        console.log(cartResponse)
        return res.json(cartResponse);
    } catch (error) {
        return res.json(new CartItemsResponse(400, "error", cart._id, null));

    }
})



module.exports = router;