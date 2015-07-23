function Receipt(cart) {
  this.header = '***<没钱赚商店>收据***\n';
  this.timeString = '打印时间：' + this.getCurrentTime() + '\n';
  this.separator = '----------------------\n';
  this.cartItemsString = cart.getCartItemsString();
  this.discountItemsString = cart.getDiscountItemsString();
  this.summary = '总计：' + cart.getAmount().toFixed(2) + '(元)\n' +
                               '节省：' + cart.getSavedMoney().toFixed(2) + '(元)\n';
  this.end = '**********************';
}

Receipt.prototype.getCurrentTime = function () {
  var date = new Date();
  var digitToString = function(digit) {
    return digit < 10 ? '0' + digit : digit;
  };
  return date.getFullYear() + '年' + digitToString(date.getMonth() + 1) + '月' + digitToString(date.getDate()) + '日 ' + digitToString(date.getHours()) + ':' + digitToString(date.getMinutes()) + ':' + digitToString(date.getSeconds());
};

Receipt.prototype.print = function() {
  console.log(this.header + this.timeString + this.separator +
                       this.cartItemsString + this.separator + this.discountItemsString +this.separator + this.summary + this.end );
};
