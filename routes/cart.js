
const { Cart } = require('../models/cart');
const { Product } = require('../models/product')

const router = require('express').Router();

async function findCart(userId) {
    return await Cart.findOne({ "userId": userId })
}

async function getCart(userId) {
    var cart = await findCart(userId)
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
        var items = cart.items

        items.push({
            productId,
            quantity,
            size
        })

        cart = await cart.save();

        return res.json(cart)

    } catch (error) {
        return res.json({ error: error })
    }

});


async function getCartById(_id) {
    return await Cart.findOne({ _id })
}


router.delete('/delete-cart-item', async (req, res) => {
    try {
        const { cartId, cartItemId } = req.body;
        const cart = await getCartById(cartId)
        if(cart == null){
            return res.json({ msg: " no cart " });
        }  
        const result = await Cart.updateOne(
            { _id: cartId },
            { $pull: { items: { _id: cartItemId } } });
        if (result.modifiedCount === 0) {
            return res.json({ msg: "not delete" });
        } else {

            return res.json({ msg: "done" });
        }
    } catch (error) {
        return res.json({ error });
    }
});



router.get('/get-cart-items', async (req, res) => {
    try {
        const { userId } = req.body;
        var cart = await findCart(userId);
        if (cart == null) {
            return res.json({
                status: 200,
                msg: "no items",
                cartId: null,
                items: []
            })
        }
        var productIds =
            cart.items.map((element) => element.productId);
        const products = await Product.find({ "_id": { $in: productIds } });
        const response = productIds.map((id) => {
            const product = products.find((element) => element._id == id)
            const cartItem = cart.items.find((item) => item.productId == id);
            const quantity = cartItem.quantity;
            const price = quantity * product.salePrice
            return {
                "id": id,
                quantity,
                "name": product.name,
                "imageUrl": product.imageUrl,
                "salePrice": product.salePrice,
                price
            };
        });
        console.log(productIds);
        return res.json(
            {
                status: 200,
                msg: "done",
                cartId: cart._id,
                items: response
            }

        );
    } catch (error) {
        return res.json(
            {
                status: 400,
                msg: error,
                cartId: cart._id,
                items: []
            }

        )
    }
})



module.exports = router;