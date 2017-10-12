var assert = require('chai').assert;
var combinations_es6 = require('../lib/combinations');
var combinations_es5 = require('../es5/combinations');
var range = require('../lib/range');

var esversion = ['es6', 'es5'];

describe('combinations', function () {
  [combinations_es6, combinations_es5].forEach(function (combinations, i) {
    describe(esversion[i], function () {
      it('returns empty', function () {
        var iter = combinations([]);
        assert.deepEqual(Array.from(iter), []);
      });

      it('returns combinations', function () {
        var iter = combinations([1, 2]);
        assert.deepEqual(Array.from(iter), [[1, 2]]);
      });

      it('returns combinations (max n)', function () {
        var iter = combinations([1, 2, 3, 4], 2);
        var expected = [ [ 1, 2 ],
          [ 1, 3 ],
          [ 1, 4 ],
          [ 2, 3 ],
          [ 2, 4 ],
          [ 3, 4 ]];

        assert.deepEqual(Array.from(iter), expected);
      });

      it('returns combinations 0', function () {
        var iter = combinations([1, 2, 3, 4], 0);
        var expected = [];

        assert.deepEqual(Array.from(iter), expected);
      });
    });
  });
});
