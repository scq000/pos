function printReceipt(inputs) {
  var counter = countSameItem(inputs);
  var receiptInfo = '***<没钱赚商店>收据***\n';
  var sumPrice = 0;
  var savedMoney = 0;
  var discountInfo = getDiscountInfo(counter);
  for (var barcode in counter) {
    var item = findItemByBarcode(barcode);
    receiptInfo += getItemInfo(item, counter, discountInfo[barcode].discount);
    sumPrice += item.price * counter[barcode];
    savedMoney += discountInfo[barcode].discount;
  }
  receiptInfo += '----------------------\n';
  receiptInfo += '挥泪赠送商品：\n';
  for (var key in discountInfo) {
    receiptInfo += discountInfo[key].info;
  }
  receiptInfo += '----------------------\n';
  receiptInfo += '总计：' + (sumPrice - savedMoney).toFixed(2) + '(元)\n';
  receiptInfo += '节省：' + savedMoney.toFixed(2) + '(元)\n';
  receiptInfo += '**********************';
  console.log(receiptInfo);
}

function countSameItem(barcodes) {
  var counter = {};
  for (var i = 0; i < barcodes.length; i++) {
    var item = barcodes[i].split('-');
    if (item.length === 1) {
      counter[item] = (counter[item] + 1) || 1;
    } else {
      counter[item[0]] = (counter[item[0]] + parseInt(item[1]) || parseInt(item[1]));
    }
  }
  return counter;
}

function findItemByBarcode(barcode) {
  var allItems = loadAllItems();
  for (var i = 0; i < allItems.length; i++) {
    if (barcode === allItems[i].barcode) {
      return allItems[i];
    }
  }
}

function getItemInfo(item, counter, discount) {
  var totalPrice = (counter[item.barcode] * item.price - discount).toFixed(2);
  return '名称：' + item.name + '，数量：' + counter[item.barcode] + item.unit + '，单价：' + item.price.toFixed(2) + '(元)，小计：' + totalPrice + '(元)\n';
}

function getDiscountInfo(counter) {
  var discountInfo;
  var promotion = loadPromotions();
  for (var i = 0; i < promotion.length; i++) {
    if (promotion[i].type === 'BUY_TWO_GET_ONE_FREE') {
      discountInfo = buyTwoGetOneFree(counter, promotion[i].barcodes);
    }
  }
  return discountInfo;
}

function buyTwoGetOneFree(counter, barcodes) {
  var result = {};
  for (var barcode in counter) {
    if (barcodes.indexOf(barcode) != -1 && counter[barcode] >= 3) {
      var item = findItemByBarcode(barcode);
      result[barcode] = {
        discount: Math.floor(counter[barcode] / 3) *item.price,
        info: '名称：' + item.name + '，数量：' + Math.floor(counter[barcode] / 3)  + item.unit + '\n'
      };
    } else {
      result[barcode] = {
        discount: 0,
        info: ''
      };
    }
  }
  return result;
}
