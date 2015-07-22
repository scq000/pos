function POS() {}

POS.prototype.countBarcodes = function (tags) {
  var counter = {};

  tags.forEach(function (tag) {
    var barcode = tag.split('-')[0];
    var count = parseFloat(tag.split('-')[1]) || 1;
    counter[barcode] = (counter[barcode] || 0) + (count || 1);
  });

  return counter;
};

POS.prototype.findItem = function (barcode) {
  var allItems = loadAllItems();

  for (var i = 0; i < allItems.length; i++) {
    if(allItems[i].barcode === barcode) {
      return allItems[i];
    }
  }
};

POS.prototype.addCartItems = function (counter,cart) {
    var promotions = loadPromotions();

    for(var barcode in counter) {
      var item = this.findItem(barcode);
      var cartItem = new CartItem(item, counter[barcode]);
      this.discount(cartItem,promotions);
      cart.addCartItem(cartItem);
  }
};

POS.prototype.discount = function (cartItem,promotions) {
  promotions.forEach(function (promotion) {
    if(promotion.type === 'BUY_TWO_GET_ONE_FREE') {
      var isExisted =  (promotion.barcodes.indexOf(cartItem.barcode) != -1);
      cartItem.freeCount = isExisted ? Math.floor(cartItem.count / 3)
                                                             :  0;
    }
  });
};
