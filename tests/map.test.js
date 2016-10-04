var assert = require('chai').assert;
var map_es6 = require('../lib/map');
var map_es5 = require('../es5/map');
var range = require('../lib/range');

var esversion = ['es6', 'es5'];

describe('map', function () {
  [map_es6, map_es5].forEach(function (map, i) {
    describe(esversion[i], function () {
      it('return mapped iterable', function () {
        var iter = map(function (item) { return item * 2; }, [1, 2, 3]);
        assert.deepEqual(Array.from(iter), [2, 4, 6]);
      });

      it('return mapped iterable from iterable', function () {
        var iter = map(function (item) { return item * 2; }, range({ start: 1, end: 4 }));
        assert.deepEqual(Array.from(iter), [2, 4, 6]);
      });

      it('return mapped iterable (curried version)', function () {
        var iter = map(function (item) { return item * 2; });
        assert.deepEqual(Array.from(iter(range({ start: 1, end: 4 }))), [2, 4, 6]);
      });
    });
  });
});
