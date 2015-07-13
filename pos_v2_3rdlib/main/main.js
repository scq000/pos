function printReceipt(inputs) {
  var counter = Utils.countSameItems(inputs);
  var order = new Order();
  order.addItems(counter);
  order.setPromotion(loadPromotions()[0], counter);
  var receiptInfo = '***<没钱赚商店>收据***\n' +
    '打印时间：' + moment().format('YYYY年MM月DD日 HH:mm:ss') + '\n' +
    '----------------------\n' +
    order.printItemsInfo() +
    '----------------------\n' +
    '挥泪赠送商品：\n' +
    order.printDiscountItemsInfo() +
    '----------------------\n' +
    '总计：' + order.getTotalPrice() + '(元)\n' +
    '节省：' + order.getDiscountPrice() + '(元)\n' +
    '**********************';
  console.log(receiptInfo);
}
