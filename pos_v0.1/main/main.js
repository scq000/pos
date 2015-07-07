function printReceipt(inputs) {
  var sum = 0;
  var receiptInfo = '***<没钱赚商店>收据***\n';
  var sameItems = mergeSameItem(inputs);
  for (var i = 0; i < sameItems.length; i++) {
    receiptInfo += getItemInfo(sameItems[i]);
    sum += sameItems[i].price * sameItems[i].count;
  }
  receiptInfo += '----------------------\n总计：' + sum.toFixed(2) + '(元)\n**********************';
  console.log(receiptInfo);
}

function getItemInfo(item) {
  return '名称：' + item.name + '，数量：' + item.count + item.unit + '，单价：' + item.price.toFixed(2) + '(元)，小计：' + (item.count * item.price).toFixed(2) + '(元)\n';
}

function mergeSameItem(items) {
  var results = [];
  results[0] = items[0];
  results[0].count = 1;
  for (var i = 1; i < items.length; i++) {
    if (results[results.length - 1].barcode === items[i].barcode) {
      results[results.length - 1].count += 1;
    } else {
      results[results.length] = items[i];
      results[results.length - 1].count = 1;
    }
  }
  return results;
}
