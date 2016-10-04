var assert = require('chai').assert;
var dropWhile_es6 = require('../lib/drop-while');
var dropWhile_es5 = require('../es5/drop-while');
var range = require('../lib/range');

var esversion = ['es6', 'es5'];

describe('dropWhile', function () {
  [dropWhile_es6, dropWhile_es5].forEach(function (dropWhile, i) {
    describe(esversion[i], function () {
      it('dropWhile on array', function () {
        var iter = dropWhile(function (item) { return item % 2 === 0; }, [2, 2, 3, 2, 2, 2]);
        assert.deepEqual(Array.from(iter), [3, 2, 2, 2]);
      });

      it('dropWhile on iterable', function () {
        var iter = dropWhile(function (item) { return item !== 4; }, range({ start: 1, end: 7 }));
        assert.deepEqual(Array.from(iter), [4, 5, 6]);
      });

      it('dropWhile on iterable (curried version)', function () {
        var iter = dropWhile(function (item) { return item !== 4; });
        assert.deepEqual(Array.from(iter(range({ start: 1, end: 7 }))), [4, 5, 6]);
      });
    });
  });
});
