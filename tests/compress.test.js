var assert = require('chai').assert;
var compress_es6 = require('../lib/compress');
var compress_es5 = require('../es5/compress');
var range = require('../lib/range');

var esversion = ['es6', 'es5'];

describe('compress', function () {
  [compress_es6, compress_es5].forEach(function (compress, i) {
    describe(esversion[i], function () {
      it('compresss iterables', function () {
        var iter = compress(range(10), [0, 1, 0, 1, 1]);
        assert.deepEqual(Array.from(iter), [1, 3, 4]);
      });
    });
  });
});
