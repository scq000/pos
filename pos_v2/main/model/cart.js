function Cart() {
  this.cartItems = [];
}

Cart.prototype.findCartItem = function (barcode) {
  for(var i = 0; i < this.cartItems.length; i++) {
    if(this.cartItems[i].item.barcode === barcode) {
      return this.cartItems[i];
    }
  }
};

Cart.prototype.addCartItem = function (cartItem) {
  var existed = this.findCartItem(cartItem.item.barcode);

  if(!existed) {
    this.cartItems.push(cartItem);
  }else{
    existed.count += cartItem.count;
  }

};

Cart.prototype.getAmount = function () {
  var amount = 0;

  this.cartItems.forEach(function(cartItem) {
    amount += cartItem.getSubTotal();
  });

  return amount;
};

Cart.prototype.getCartItemsString = function () {
  var cartItemsString = '';

  this.cartItems.forEach(function (cartItem) {
    cartItemsString += cartItem.getString();
  });

  return cartItemsString;
};

Cart.prototype.getSavedMoney = function (discountItemsDetail) {
  var savedMoney = 0;

  discountItemsDetail.forEach(function (discountItemDetail) {
    savedMoney += discountItemDetail.savedMoney;
  });

  return savedMoney;
};

Cart.prototype.getFreeItemsString = function (discountItemsDetail) {
  var freeItemsString = '';

  discountItemsDetail.forEach(function (discountItemDetail) {
    var freeItem = discountItemDetail.cartItem;
    freeItemsString += '名称：' + freeItem.item.name + '，数量：' + discountItemDetail.freeCount + freeItem.item.unit + '\n';
  });

  return freeItemsString;
};
