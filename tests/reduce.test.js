var assert = require('chai').assert;
var reduce_es6 = require('../lib/reduce');
var reduce_es5 = require('../es5/reduce');
var range = require('../lib/range');

var esversion = ['es6', 'es5'];

describe('reduce', function () {
  [reduce_es6, reduce_es5].forEach(function (reduce, i) {
    describe(esversion[i], function () {
      it('sums an array', function () {
        var sum = reduce([0, 1, 2, 3], function (acc, x) {
          return acc + x;
        }, 0);
        assert.equal(sum, 6);
      });

      it('sums a range', function () {
        var sum = reduce(range(4), function (acc, x) {
          return acc + x;
        }, 0);
        assert.equal(sum, 6);
      });
    });
  });
});
