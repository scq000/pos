function CartItem(item,count) {
  this.barcode = item.barcode;
  this.name = item.name;
  this.unit = item.unit;
  this.price = item.price || 0.00;
  this.count = count || 0;
  this.freeCount = 0;
}
CartItem.prototype.getSubTotal = function () {
  return (this.count - this.freeCount) * this.price;
};
CartItem.prototype.getString = function () {
  return '名称：' + this.name +
    '，数量：' + this.count + this.unit +
    '，单价：' + this.price.toFixed(2) +
    '(元)，小计：' + this.getSubTotal().toFixed(2) + '(元)\n';
};
CartItem.prototype.getDiscountString = function () {
  return this.freeCount ? '名称：' + this.name +'，数量：' + this.freeCount + this.unit + '\n'
                                        : '';
};
