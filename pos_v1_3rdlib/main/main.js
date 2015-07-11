function printReceipt(inputs) {
  var receiptInfo = '***<没钱赚商店>收据***\n';
  var counter = countSameBarcode(inputs);
  var discountInfo = getDiscountInfo(counter);
  var totalPrice = 0;
  var savedMoney = 0;
  _.forEach(counter, function(barcodeNumber, barcode) {
    var item = findItemByBarcode(barcode);
    receiptInfo += getItemInfo(item, barcodeNumber, discountInfo[barcode].discount);
    totalPrice += item.price * barcodeNumber;
    savedMoney += discountInfo[barcode].discount;
  });
  receiptInfo += '----------------------\n';
  receiptInfo += '挥泪赠送商品：\n';
  _.forEach(discountInfo, function(item) {
    receiptInfo += item.info;
  });
  receiptInfo += '----------------------\n';
  receiptInfo += '总计：' + (totalPrice - savedMoney).toFixed(2) + '(元)\n';
  receiptInfo += '节省：' + savedMoney.toFixed(2) + '(元)\n';
  receiptInfo += '**********************';
  console.log(receiptInfo);
}

function countSameBarcode(barcodes) {
  return _.reduce(barcodes, function(counter, barcode) {
    var item = barcode.split('-');
    counter[item[0]] = (counter[item[0]] || 0) + (parseInt(item[1]) || 1);
    return counter;
  }, {});
}

function findItemByBarcode(barcode) {
  return _.find(loadAllItems(), function(item) {
    return item.barcode === barcode;
  });
}

function getItemInfo(item, number, discount) {
  var totalPrice = (number * item.price - discount).toFixed(2);
  return '名称：' + item.name + '，数量：' + number + item.unit + '，单价：' + item.price.toFixed(2) + '(元)，小计：' + totalPrice + '(元)\n';
}

function getDiscountInfo(counter) {
  var discountInfo;
  _.forEach(loadPromotions(), function(item) {
    if (item.type === 'BUY_TWO_GET_ONE_FREE') {
      discountInfo = buyTwoGetOneFree(counter, item.barcodes);
    }
  });
  return discountInfo;
}

function buyTwoGetOneFree(counter, discountBarcodes) {
  var result = {};
  _.forEach(counter, function(barcodeCount, barcode) {
    var item = findItemByBarcode(barcode);
    result[barcode] = {};
    result[barcode].discount = _.includes(discountBarcodes, barcode) ? Math.floor(barcodeCount / 3) * item.price : 0;
    result[barcode].info = result[barcode].discount === 0 ? '' : '名称：' + item.name + '，数量：' + Math.floor(barcodeCount / 3) + item.unit + '\n';
  });
  return result;
}
