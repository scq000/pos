var Utils = {
  countSameItems: function(barcodesArray) {
    return barcodesArray.reduce(function(counter, barcode) {
      var item = barcode.split('-');
      counter[item[0]] = (counter[item[0]] || 0) + (parseInt(item[1]) || 1);
      return counter;
    }, {});
  },
  findItemByBarcode: function(barcode, allItems) {
    if (!allItems) {
      allItems = loadAllItems();
    }
    return _.find(allItems, function(item) {
      return item.barcode === barcode;
    });
  }
};
