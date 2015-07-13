function BoughtItem(barcode, count) {
  var item = Utils.findItemByBarcode(barcode);
  this.name = item.name;
  this.barcode = barcode;
  this.price = item.price;
  this.unit = item.unit;
  this.count = count;
  this.discountCount = 0;
}
BoughtItem.prototype = {
  getDiscountPrice: function() {
    return this.discountCount * this.price;
  },
  getTotalPrice: function() {
    return this.price * this.count - this.getDiscountPrice();
  },
  getItemInfo: function() {
    return '名称：' + this.name + '，数量：' + this.count + this.unit + '，单价：' + this.price.toFixed(2) + '(元)，小计：' + this.getTotalPrice().toFixed(2) + '(元)\n';
  },
  getDiscountInfo: function() {
    return '';
  }
};
