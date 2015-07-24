function POS(cart,scanner) {
  this.cart = cart;
  this.scanner = scanner;
}

POS.prototype.scan = function (tags){
  for(var i = 0; i < tags.length; i++) {
    var cartItem = this.scanner.scan(tags[i]);
    this.cart.addCartItem(cartItem);
  }
};

POS.prototype.discount = function (promotion) {
  var promotionCalculator = new PromotionCalculator(promotion,this.cart);
  this.discountItemsDetail = promotionCalculator.getDiscountItemsDetial();
};

POS.prototype.getReceipt = function () {

  var receipt =
  '***<没钱赚商店>收据***\n' +
  '打印时间：' + Utils.getCurrentTime() +'\n' +
  '----------------------\n' +
    this.cart.getCartItemsString() +
  '----------------------\n' +
  '挥泪赠送商品：\n' +
    this.cart.getFreeItemsString(this.discountItemsDetail)+
  '----------------------\n' +
  '总计：' + Utils.formatPrice(this.cart.getAmount()) + '(元)\n' +
  '节省：' + Utils.formatPrice(this.cart.getSavedMoney(this.discountItemsDetail)) + '(元)\n' +
  '**********************';

  return receipt;
};
