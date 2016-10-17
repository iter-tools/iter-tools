var assert = require('chai').assert;
var product_es6 = require('../lib/product');
var product_es5 = require('../es5/product');
var range = require('../lib/range');
var tee = require('../lib/tee');

var esversion = ['es6', 'es5'];

describe('product', function () {
  [product_es6, product_es5].forEach(function (product, i) {
    describe(esversion[i], function () {
      it('returns empty', function () {
        var iter = product();
        assert.deepEqual(Array.from(iter), []);
      });

      it('returns single', function () {
        var iter = product([1, 2, 3]);
        assert.deepEqual(Array.from(iter), [[1], [2], [3]]);
      });

      it('returns double', function () {
        var iter = product([1, 2], [3, 4]);
        assert.deepEqual(Array.from(iter), [[1, 3], [1, 4], [2, 3], [2, 4]]);
      });

      it('returns with repeat', function () {
        var iter = product(...tee([1, 2], 2));
        assert.deepEqual(Array.from(iter), [[1, 1], [1, 2], [2, 1], [2, 2]]);
      });

      it('returns triple', function () {
        var iter = product([1, 2], [3, 4], [5, 6]);
        assert.deepEqual(Array.from(iter), [
          [1, 3, 5],
          [1, 3, 6],
          [1, 4, 5],
          [1, 4, 6],
          [2, 3, 5],
          [2, 3, 6],
          [2, 4, 5],
          [2, 4, 6]
        ]);
      });
    });
  });
});
