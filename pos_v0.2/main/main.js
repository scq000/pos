function printReceipt(inputs) {
  var counter = countSameItem(inputs);
  var receiptInfo = '***<没钱赚商店>收据***\n';
  var sumPrice = 0;
  for (var barcode in counter) {
    var item = findItemByBarcode(barcode);
    receiptInfo += getItemInfo(item,counter);
    sumPrice += item.price * counter[barcode];
  }
  receiptInfo += '----------------------\n';
  receiptInfo += '总计：' + sumPrice.toFixed(2) + '(元)\n';
  receiptInfo += '**********************';
  console.log(receiptInfo);
}

function countSameItem(barcodes) {
  var counter = {};
  for (var i = 0; i < barcodes.length; i++) {
      counter[barcodes[i]] = (counter[barcodes[i]] + 1) || 1;
  }
  return counter;
}

function findItemByBarcode(barcode) {
  var allItems = loadAllItems();
  for (var i = 0; i <allItems.length; i++) {
    if (barcode === allItems[i].barcode) {
      return allItems[i];
    }
  }
}

function getItemInfo(item,counter) {
  return '名称：' + item.name + '，数量：' + counter[item.barcode] + item.unit + '，单价：' + item.price.toFixed(2) + '(元)，小计：' + (counter[item.barcode] * item.price).toFixed(2) + '(元)\n';
}
