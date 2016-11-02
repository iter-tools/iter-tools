var assert = require('chai').assert;
var flatMap_es6 = require('../lib/flat-map');
var flatMap_es5 = require('../es5/flat-map');
var range = require('../lib/range');

var esversion = ['es6', 'es5'];

describe('flatMap', function () {
  [flatMap_es6, flatMap_es5].forEach(function (flatMap, i) {
    describe(esversion[i], function () {
      it('return flatMapped iterable', function () {
        var iter = flatMap(function (item) { return [item, item * 2]; }, [1, 2, 3]);
        assert.deepEqual(Array.from(iter), [1, 2, 2, 4, 3, 6]);
      });

      it('return flatMapped iterable from iterable', function () {
        var iter = flatMap(function (item) { return [item, item * 2]; }, range({ start: 1, end: 4 }));
        assert.deepEqual(Array.from(iter), [1, 2, 2, 4, 3, 6]);
      });

      it('return flatMapped iterable (curried version)', function () {
        var iter = flatMap(function (item) { return [item, item * 2]; });
        assert.deepEqual(Array.from(iter(range({ start: 1, end: 4 }))), [1, 2, 2, 4, 3, 6]);
      });
    });
  });
});
