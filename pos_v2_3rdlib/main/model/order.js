function Order() {
  this.boughtItems = [];
  this.totalPrice = 0;
  this.savedPrice = 0;
}
Order.prototype = {
  addItems: function(counter) {
    var self = this;
    _.forEach(counter, function(barcodeCount, barcode) {
      self.boughtItems.push(new BoughtItem(barcode, barcodeCount));
    });
  },
  setPromotion: function(promotion, counter) {
    if (promotion.type === 'BUY_TWO_GET_ONE_FREE') {
      this.buyTwoGetOneFree(promotion.barcodes, counter);
    }
  },
  buyTwoGetOneFree: function(barcodes, counter) {
    for (var barcode in counter) {
      if (_.includes(barcodes, barcode)) {
        var discountItem = Utils.findItemByBarcode(barcode, this.boughtItems);
        discountItem.discountCount = Math.floor(counter[barcode] / 3);
        discountItem.getDiscountInfo = function() {
          return '名称：' + this.name + '，数量：' + this.discountCount + this.unit + '\n';
        };
      }
    }
  },
  getTotalPrice: function() {
    return _.reduce(this.boughtItems,function(totalPrice,item){
      return totalPrice + item.getTotalPrice();
    },0).toFixed(2);
  },
  getDiscountPrice: function() {
    return _.reduce(this.boughtItems,function(discountPrice,item){
      return discountPrice + item.getDiscountPrice();
    },0).toFixed(2);
  },
  printItemsInfo: function() {
    return _.reduce(this.boughtItems,function(itemsInfo,item){
      return itemsInfo + item.getItemInfo();
    },'');
  },
  printDiscountItemsInfo: function() {
    return _.reduce(this.boughtItems,function(disocuntItemsInfo,item){
      return disocuntItemsInfo + item.getDiscountInfo();
    },'');
  }
};
