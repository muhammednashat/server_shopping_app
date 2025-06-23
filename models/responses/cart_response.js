class CartResponse{
    constructor(status, msg , cartId, items){
        this.status = status;
        this.msg  = msg;
        this.cartId = cartId;
        this.items = items;

    };
}




module.exports = CartResponse
