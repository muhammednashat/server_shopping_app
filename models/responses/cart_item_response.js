class CartItemResponse{
constructor(id, quantity, name, imageUrl, salePrice, price , size){
    this.id = id;
    this.quantity = quantity;
    this.name = name;
    this.imageUrl = imageUrl;
    this.salePrice = salePrice;
    this.price = price;
    this.size = size;
}
}

module.exports = CartItemResponse