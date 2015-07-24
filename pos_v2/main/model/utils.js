function Utils() {

}
Utils.getCurrentTime = function() {
  var date = new Date();
  var digitToString = function(digit) {
    return digit < 10 ? '0' + digit : digit;
  };
  return date.getFullYear() + '年' + digitToString(date.getMonth() + 1) + '月' + digitToString(date.getDate()) + '日 ' + digitToString(date.getHours()) + ':' + digitToString(date.getMinutes()) + ':' + digitToString(date.getSeconds());
};
Utils.formatPrice = function (price) {
  return price.toFixed(2);
};
