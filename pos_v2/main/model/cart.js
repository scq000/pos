function Cart() {
  this.cartItems = [];
}

Cart.prototype.addCartItem = function (cartItem) {
  this.cartItems.push(cartItem);
};

Cart.prototype.getAmount = function () {
  var amount = 0;

  this.cartItems.forEach(function(cartItem) {
    amount += cartItem.getSubTotal();
  });

  return amount;
};

Cart.prototype.getSavedMoney = function () {
  var savedMoney = 0;

  this.cartItems.forEach(function(cartItem) {
    savedMoney += cartItem.freeCount * cartItem.price;
  });

  return savedMoney;
};

Cart.prototype.getCartItemsString = function () {
  var cartItemsString = '';
  this.cartItems.forEach(function (cartItem) {
    cartItemsString += cartItem.getString();
  });
  return cartItemsString;
};

Cart.prototype.getDiscountItemsString = function () {
  var discountItemsString = '挥泪赠送商品：\n';

  this.cartItems.forEach(function (cartItem) {
    discountItemsString += cartItem.getDiscountString();
  });

  return discountItemsString;
};
