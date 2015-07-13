function Order() {
  this.boughtItems = [];
  this.totalPrice = 0;
  this.savedPrice = 0;
}
Order.prototype = {
  addItems: function(counter) {
    for (var barcode in counter) {
      this.boughtItems.push(new BoughtItem(barcode, counter[barcode]));
    }
  },
  setPromotion: function(promotion, counter) {
    if (promotion.type === 'BUY_TWO_GET_ONE_FREE') {
      this.buyTwoGetOneFree(promotion.barcodes, counter);
    }
  },
  buyTwoGetOneFree: function(barcodes, counter) {
    for (var barcode in counter) {
      if (barcodes.indexOf(barcode) != -1) {
        var discountItem = Utils.findItemByBarcode(barcode, this.boughtItems);
        discountItem.discountCount = Math.floor(counter[barcode] / 3);
        discountItem.getDiscountInfo = function() {
          return '名称：' + this.name + '，数量：' + this.discountCount + this.unit + '\n';
        };
      }
    }
  },
  getTotalPrice: function() {
    var totalPrice = 0;
    for (var i = 0; i < this.boughtItems.length; i++) {
      totalPrice += this.boughtItems[i].getTotalPrice();
    }
    return totalPrice.toFixed(2);
  },
  getDiscountPrice: function() {
    var discountPrice = 0;
    for (var i = 0; i < this.boughtItems.length; i++) {
      discountPrice += this.boughtItems[i].getDiscountPrice();
    }
    return discountPrice.toFixed(2);
  },
  printItemsInfo: function() {
    var itemsInfo = '';
    for (var i = 0; i < this.boughtItems.length; i++) {
      itemsInfo += this.boughtItems[i].getItemInfo();
    }
    return itemsInfo;
  },
  printDiscountItemsInfo: function() {
    var discountItemsInfo = '';
    for (var i = 0; i < this.boughtItems.length; i++) {
      discountItemsInfo += this.boughtItems[i].getDiscountInfo();
    }
    return discountItemsInfo;
  }
};
