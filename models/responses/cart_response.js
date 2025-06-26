class CartResponse{
    constructor(status, msg , cartId, items,totalPrice){
        console.log(totalPrice)
        this.status = status;
        this.msg  = msg;
        this.cartId = cartId;
        this.items = items;
        this.totalPrice = totalPrice;

    };
}




module.exports = CartResponse
