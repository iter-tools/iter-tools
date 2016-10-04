var assert = require('chai').assert;
var takeWhile_es6 = require('../lib/take-while');
var takeWhile_es5 = require('../es5/take-while');
var range = require('../lib/range');

var esversion = ['es6', 'es5'];

describe('takeWhile', function () {
  [takeWhile_es6, takeWhile_es5].forEach(function (takeWhile, i) {
    describe(esversion[i], function () {
      it('takeWhile on array', function () {
        var iter = takeWhile(function (item) { return item % 2 === 0; }, [2, 2, 3, 2, 2, 2]);
        assert.deepEqual(Array.from(iter), [2, 2]);
      });

      it('takeWhile on iterable', function () {
        var iter = takeWhile(function (item) { return item !== 4; }, range({ start: 1, end: 7 }));
        assert.deepEqual(Array.from(iter), [1, 2, 3]);
      });

      it('takeWhile on iterable (curried version)', function () {
        var iter = takeWhile(function (item) { return item !== 4; });
        assert.deepEqual(Array.from(iter(range({ start: 1, end: 7 }))), [1, 2, 3]);
      });
    });
  });
});
