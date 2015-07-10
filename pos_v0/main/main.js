function printReceipt(inputs) {
  var sum = 0;
  var receiptInfo = '***<没钱赚商店>收据***\n';
  for (var i = 0; i < inputs.length; i++) {
    receiptInfo += getItemInfo(inputs[i]);
    sum += inputs[i].price * inputs[i].count;
  }
  receiptInfo += '----------------------\n总计：' + sum.toFixed(2) + '(元)\n**********************';
  console.log(receiptInfo);
}

function getItemInfo(item) {
  return '名称：' + item.name + '，数量：' + item.count + item.unit +'，单价：' + item.price.toFixed(2) + '(元)，小计：' + (item.count * item.price).toFixed(2) + '(元)\n';
}
