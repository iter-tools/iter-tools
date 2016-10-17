var compose = require('async-deco/utils/compose');
var measureSpeedSync = require('measure-speed').measureSpeedSync;
var range = require('../lib/range');
var filter = require('../lib/filter');
var map = require('../lib/map');

function power2(x) {
  return x * x;
}

function isEven(x) {
  return (x % 2) === 0;
}

function for_vs_while_in_iterators() {
  var ms = measureSpeedSync(function () {
    var a = range(2000);
    var arr = [];
    for (var i of a) {
      arr.push(i);
    }
    return arr;
  }, { samples: 1000, discard: 10 });

  console.log(ms);

  var iter = compose(map(power2), filter(isEven));
  var ms = measureSpeedSync(function () {
    var a = range(2000);
    var next, arr = [];
    while (true) {
      next = a.next();
      if (next.done) break;
      arr.push(next.value);
    }
    return arr;
  }, { samples: 1000, discard: 10 });

  console.log(ms);
}

function filter_map_array_vs_iter() {
  var a = Array.from(range(1000));
  var ms = measureSpeedSync(function () {
    var result = a
    .map(power2)
    .filter(isEven);
    return result;
  }, { samples: 1000, discard: 10 });

  console.log(ms);
  var a = Array.from(range(1000));

  var iter = compose(map(power2), filter(isEven));

  var ms = measureSpeedSync(function () {
    var result = Array.from(iter(a));
    return result;
  }, { samples: 1000, discard: 10 });

  console.log(ms);
}

module.exports = {
  for_vs_while_in_iterators: for_vs_while_in_iterators,
  filter_map_array_vs_iter: filter_map_array_vs_iter,
};
