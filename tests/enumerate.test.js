var assert = require('chai').assert;
var enumerate_es6 = require('../lib/enumerate');
var enumerate_es5 = require('../es5/enumerate');
var range = require('../lib/range');

var esversion = ['es6', 'es5'];

describe('enumerate', function () {
  [enumerate_es6, enumerate_es5].forEach(function (enumerate, i) {
    describe(esversion[i], function () {
      it('enumerates iterables', function () {
        var iter = enumerate(range({ start: 1, end: 4 }));
        assert.deepEqual(Array.from(iter), [[0, 1], [1, 2], [2, 3]]);
      });
      it('enumerates iterables with start', function () {
        var iter = enumerate(range({ start: 1, end: 4 }), 3);
        assert.deepEqual(Array.from(iter), [[3, 1], [4, 2], [5, 3]]);
      });
    });
  });
});
