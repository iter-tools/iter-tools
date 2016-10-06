var assert = require('chai').assert;
var iter_es6 = require('../lib/iter');
var iter_es5 = require('../es5/iter');
var range = require('../lib/range');

var esversion = ['es6', 'es5'];

describe('iter', function () {
  [iter_es6, iter_es5].forEach(function (iter, i) {
    describe(esversion[i], function () {
      it('works with iterables', function () {
        var i = range(3);
        assert.equal(i, iter(i));
        assert.deepEqual(Array.from(iter(i)), [0, 1, 2]);
      });
      it('works with generators', function () {
        var i = iter(range, 3);
        assert.deepEqual(Array.from(i), [0, 1, 2]);
      });
      it('works with Symbol.iterator', function () {
        var i = iter([0, 1, 2]);
        assert.deepEqual(Array.from(i), [0, 1, 2]);
      });
      it('works with Objects', function () {
        var i = iter({'1' : 1, '2': 2});
        assert.deepEqual(Array.from(i), [['1', 1], ['2', 2]]);
      });
    });
  });
});
