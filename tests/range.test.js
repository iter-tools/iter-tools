var assert = require('chai').assert;
var range_es6 = require('../lib/range');
var range_es5 = require('../es5/range');

var esversion = ['es6', 'es5'];

describe('range', function () {
  [range_es6, range_es5].forEach(function (range, i) {
    describe(esversion[i], function () {
      it('return simple range', function () {
        assert.deepEqual(Array.from(range(3)), [0, 1, 2]);
      });

      it('return simple range with start/end', function () {
        assert.deepEqual(Array.from(range({ start: 3, end: 6 })), [3, 4, 5]);
      });

      it('return simple range with start/end and step', function () {
        assert.deepEqual(Array.from(range({ start: 3, end: 6, step: 2 })), [3, 5]);
      });

      it('return empty array for negative end', function () {
        assert.deepEqual(Array.from(range(-2)), []);
      });

      it('return empty array for negative end', function () {
        assert.deepEqual(Array.from(range({ start: -2, end: -5 })), []);
      });

      it('return backward count', function () {
        assert.deepEqual(Array.from(range({ start: -2, end: -5, step: -1 })), [-2, -3, -4]);
      });
    });
  });
});
