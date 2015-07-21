function printReceipt(tags) {

  var cartItems = getCartItems(tags);

  setPromotions(cartItems);

  var receipt =
    '***<没钱赚商店>收据***\n' +
    getCartItemsString(cartItems) +
    '----------------------\n' +
    '挥泪赠送商品：\n' +
    getFreeItemsString(cartItems) +
    '----------------------\n' +
    '总计：' + formatPrice(getAmount(cartItems)) + '(元)\n' +
    '节省：' + formatPrice(getSavedMoney(cartItems)) + '(元)\n' +
    '**********************';

  console.log(receipt);
}

function getItem(barcode){
  var allItems = loadAllItems();
  for(var i = 0; i < allItems.length; i++) {
    if(allItems[i].barcode === barcode){
      return allItems[i];
    }
  }
}


function getCartItems(tags) {
  var cartItems = [];

  tags.forEach(function(tag) {
    var barcode = tag.split('-')[0];
    var count = tag.split('-')[1] || 1;
    var cartItem = findItem(cartItems,barcode);
    if(cartItem) {
      cartItem.count += count;
    }else {
      cartItem = getItem(barcode);
      cartItem.count = count;
      cartItems.push(cartItem);
    }
  });

  return cartItems;
}

function setPromotions(cartItems) {
  var promotions = loadPromotions();

  promotions.forEach(function (promotion) {
    if(promotion.type === 'BUY_TWO_GET_ONE_FREE') {
      buyTwoGetOneFree(cartItems,promotion.barcodes);
    }
  });

}

function  buyTwoGetOneFree(cartItems,barcodes) {
  cartItems.forEach(function(cartItem) {
    if(barcodes.indexOf(cartItem.barcode) != -1) {
      cartItem.freeCount = Math.floor(cartItem.count / 3);
    }else{
      cartItem.freeCount = 0;
    }
  });
}


function findItem(cartItems,barcode) {
  for(var i = 0; i < cartItems.length; i++) {
    if(cartItems[i].barcode === barcode) {
      return cartItems[i];
    }
  }
}

function getSubTotal(cartItem) {
  return (cartItem.count - cartItem.freeCount) * cartItem.price;
}

function getAmount(cartItems) {
  var amount = 0;

  cartItems.forEach(function(cartItem) {
    amount += getSubTotal(cartItem);
  });

  return amount;
}

function getSavedMoney(cartItems) {
  var savedMoney = 0;

  cartItems.forEach(function(cartItem) {
    savedMoney += cartItem.freeCount * cartItem.price;
  });

  return savedMoney;
}

function getFreeItemsString(cartItems) {
  var itemsString = '';

  cartItems.forEach(function(cartItem) {
    if(cartItem.freeCount) {
      itemsString +=
        '名称：' + cartItem.name +
        '，数量：'　+ cartItem.freeCount + cartItem.unit + '\n';
    }
  });

  return itemsString;
}

function getCartItemsString(cartItems) {
  var itemsString = '';

  cartItems.forEach(function(cartItem) {
    itemsString +=
      '名称：' + cartItem.name +
      '，数量：' + cartItem.count + cartItem.unit +
      '，单价：' + formatPrice(cartItem.price) +
      '(元)，小计：' + formatPrice(getSubTotal(cartItem)) + '(元)\n';
  });

  return itemsString;
}

function formatPrice(price) {
  return price.toFixed(2);
}
