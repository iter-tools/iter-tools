var compose = require('async-deco/utils/compose');
var measureSpeed = require('measure-speed');
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
  measureSpeed(function () {
    var a = range(2000);
    var arr = [];
    for (var i of a) {
      arr.push(i);
    }
    return arr;
  }, { samples: 1000, discard: 10 }, function (err, ms) {
    console.log('************ for loop iterator ************');
    console.log(ms);
  });


  var iter = compose(map(power2), filter(isEven));
  measureSpeed(function () {
    var a = range(2000);
    var next, arr = [];
    while (true) {
      next = a.next();
      if (next.done) break;
      arr.push(next.value);
    }
    return arr;
  }, { samples: 1000, discard: 10 }, function (err, ms) {
    console.log('************ while loop iterator ************');
    console.log(ms);
  });

}

function filter_map_array_vs_iter() {
  var a = Array.from(range(1000));
  measureSpeed(function () {
    var result = a
    .map(power2)
    .filter(isEven);
    return result;
  }, { samples: 1000, discard: 10 }, function (err, ms) {
    console.log('************ map/filter array ************');
    console.log(ms);
  });

  var a = Array.from(range(1000));

  var iter = compose(map(power2), filter(isEven));

  measureSpeed(function () {
    var result = Array.from(iter(a));
    return result;
  }, { samples: 1000, discard: 10 }, function (err, ms) {
    console.log('************ map/filter iter ************');
    console.log(ms);
  });

}

module.exports = {
  for_vs_while_in_iterators: for_vs_while_in_iterators,
  filter_map_array_vs_iter: filter_map_array_vs_iter,
};
