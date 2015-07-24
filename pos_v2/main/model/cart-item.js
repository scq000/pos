function CartItem(item,count) {
  this.item = item;
  this.count = count;
}

CartItem.prototype.getSubTotal = function () {

      return this.count  * this.item.price;

};

CartItem.prototype.getString = function () {
  return '名称：' + this.item.name +
    '，数量：' + this.count + this.item.unit +
    '，单价：' + this.item.price.toFixed(2) +
    '(元)，小计：' + this.getSubTotal().toFixed(2) + '(元)\n';
};
