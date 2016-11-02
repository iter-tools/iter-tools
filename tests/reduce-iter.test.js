var assert = require('chai').assert;
var reduceIter_es6 = require('../lib/reduce-iter');
var reduceIter_es5 = require('../es5/reduce-iter');
var range = require('../lib/range');

var esversion = ['es6', 'es5'];

describe('reduce-iter', function () {
  [reduceIter_es6, reduceIter_es5].forEach(function (reduceIter, i) {
    describe(esversion[i], function () {
      it('sums an array', function () {
        var seq = reduceIter(function (acc, x) {
          return acc + x;
        }, 0, [0, 1, 2, 3]);
        assert.deepEqual(Array.from(seq), [0, 1, 3, 6]);
      });

      it('sums a range', function () {
        var seq = reduceIter(function (acc, x) {
          return acc + x;
        }, 0, range(4));
        assert.deepEqual(Array.from(seq), [0, 1, 3, 6]);
      });
    });
  });
});
