var range = require('./range');
var map = require('./map');

function tee(iterable, number) {
  number = number || 2;
  var arrays = Array.from(map(function () { return []; }, range(number)));
  var done = false;
  function* teeGen(a) {
    var newItem;
    while (true) {
      if (a.length) {
        yield a.shift();
      } else {
        if (done) {
          return;
        }
        newItem = iterable.next();
        if (newItem.done) {
          done = true;
          return;
        } else {
          arrays.forEach(function (ar) {
            ar.push(newItem.value);
          });
          yield a.shift();
        }
      }
    }
  }
  return arrays.map(function (a) { return teeGen(a); });
}

module.exports = tee;
