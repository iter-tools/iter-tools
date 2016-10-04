var assert = require('chai').assert;
var slice_es6 = require('../lib/slice');
var slice_es5 = require('../es5/slice');

var esversion = ['es6', 'es5'];

describe('slice', function () {
  [slice_es6, slice_es5].forEach(function (slice, i) {
    describe(esversion[i], function () {
      var list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

      it('return simple slice', function () {
        assert.deepEqual(Array.from(slice(2, list)), [0, 1]);
      });

      it('return simple slice with start/end', function () {
        assert.deepEqual(Array.from(slice({ start: 1, end: 4 }, list)), [1, 2, 3]);
      });

      it('return simple slice with start/end/step', function () {
        assert.deepEqual(Array.from(slice({ start: 1, end: 6, step: 2 }, list)), [1, 3, 5]);
      });

      it('return curried slice', function () {
        assert.deepEqual(Array.from(slice(2)(list)), [0, 1]);
      });
    });
  });
});
