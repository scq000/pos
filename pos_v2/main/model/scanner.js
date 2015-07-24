function Scanner(){

}

Scanner.prototype.scan = function(tag) {

  var tagArray = tag.split('-');
  var barcode = tagArray[0];
  var count = parseFloat(tagArray[1]) || 1;

  var  item = Item.find(barcode);

  return new CartItem(item,count);
};
