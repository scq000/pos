var Utils = {
  getCurrentDateTime: function() {
    var date = new Date();
    var digitToString = function(digit) {
      return ('0' + digit).slice(-2);
    };
    return date.getFullYear() + '年' + digitToString(date.getMonth() + 1) + '月' + digitToString(date.getDate()) + '日 ' + digitToString(date.getHours()) + ':' + digitToString(date.getMinutes()) + ':' + digitToString(date.getSeconds());
  },
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
    for (var i = 0; i < allItems.length; i++) {
      if (barcode === allItems[i].barcode) {
        return allItems[i];
      }
    }
  }
};
