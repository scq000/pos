function printReceipt(tags) {

  var cart = new Cart();
  var scanner = new Scanner();
  var pos = new POS(cart,scanner);
  pos.scan(tags);

  pos.discount(loadPromotions()[0]);

  var receipt = pos.getReceipt();

  console.log(receipt);

}
