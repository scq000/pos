function printReceipt(tags) {
  var pos = new POS();
  var counter = pos.countBarcodes(tags);
  var cart = new Cart();
  pos.addCartItems(counter,cart);

  var receipt = new Receipt(cart);
  receipt.print();
}
