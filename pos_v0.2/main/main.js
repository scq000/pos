function printReceipt(barcodes) {
  var cartItems = getCartItems(barcodes);

  var receipt =
    '***<没钱赚商店>收据***\n' +
    getCartItemsString(cartItems) +
    '----------------------\n' +
    '总计：' + formatPrice(getAmount(cartItems)) + '(元)\n' +
    '**********************';

  console.log(receipt);
}

function getCartItems(barcodes) {
  var cartItems = [];

  barcodes.forEach(function (barcode) {
    var cartItem = findItem(cartItems, barcode);
    if (cartItem) {
      cartItem.count++;
    } else {
      cartItem = findItem(loadAllItems(),barcode);
      cartItem.count = 1;
      cartItems.push(cartItem);
    }
  });

  return cartItems;
}

function findItem(cartItems,barcode) {
  return cartItems.filter(function(cartItem) {
    return cartItem.barcode === barcode;
  })[0];
}

function getSubTotal(count, price) {
  return count * price;
}

function getAmount(cartItems) {
  var amount = 0;

  cartItems.forEach(function(cartItem) {
    amount += getSubTotal(cartItem.count, cartItem.price);
  });

  return amount;
}

function getCartItemsString(cartItems) {
  var itemsString = '';

  cartItems.forEach(function(cartItem) {
    itemsString +=
      '名称：' + cartItem.name +
      '，数量：' + cartItem.count + cartItem.unit +
      '，单价：' + formatPrice(cartItem.price) +
      '(元)，小计：' + formatPrice(getSubTotal(cartItem.count, cartItem.price)) + '(元)\n';
  });

  return itemsString;
}

function formatPrice(price) {
  return price.toFixed(2);
}
