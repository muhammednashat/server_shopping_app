class CartItemResponse{
constructor(id, quantity, name, imageUrl, salePrice, price){
    this.id = id;
    this.quantity = quantity;
    this.name = name;
    this.imageUrl = imageUrl;
    this.salePrice = salePrice;
    this.price = price
}
}

module.exports = CartItemResponse