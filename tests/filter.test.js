var assert = require('chai').assert;
var filter_es6 = require('../lib/filter');
var filter_es5 = require('../es5/filter');
var range = require('../lib/range');

var esversion = ['es6', 'es5'];

describe('filter', function () {
  [filter_es6, filter_es5].forEach(function (filter, i) {
    describe(esversion[i], function () {
      it('return filtered iterable', function () {
        var iter = filter(function (item) { return item % 2 === 0; }, [1, 2, 3, 4, 5, 6]);
        assert.deepEqual(Array.from(iter), [2, 4, 6]);
      });

      it('return filtered iterable from iterable', function () {
        var iter = filter(function (item) { return item % 2 === 0; }, range({ start: 1, end: 7 }));
        assert.deepEqual(Array.from(iter), [2, 4, 6]);
      });

      it('return filtered iterable (curried version)', function () {
        var iter = filter(function (item) { return item % 2 === 0; });
        assert.deepEqual(Array.from(iter(range({ start: 1, end: 7 }))), [2, 4, 6]);
      });
    });
  });
});
