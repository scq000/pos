var Strategy = {
  buyTwoGetOneFree: function (barcodes,cart) {
    var discountItemsDetail = [];

    barcodes.forEach(function(barcode) {
      var cartItem = cart.findCartItem(barcode);
      if(cartItem) {
        var freeCount = Math.floor(cartItem.count / 3);
        var savedMoney = freeCount * cartItem.item.price;

        cartItem.getSubTotal = function () {
          return this.item.price * (this.count - Math.floor(this.count / 3));
        };


        discountItemsDetail.push({cartItem:cartItem ,freeCount:freeCount , savedMoney: savedMoney });
      }
    });

  return discountItemsDetail;

  }
};
