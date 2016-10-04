var assert = require('chai').assert;
var zipLongest_es6 = require('../lib/zip-longest');
var zipLongest_es5 = require('../es5/zip-longest');
var range = require('../lib/range');

var esversion = ['es6', 'es5'];

describe('zipLongest', function () {
  [zipLongest_es6, zipLongest_es5].forEach(function (zipLongest, i) {
    describe(esversion[i], function () {
      it('zips', function () {
        var iter = zipLongest('x', [1, 2, 3], [4, 5, 6], [7, 8, 9]);
        assert.deepEqual(Array.from(iter), [[1, 4, 7], [2, 5, 8], [3, 6, 9] ]);
      });

      it('zips using iterables', function () {
        var iter = zipLongest('x', range({ start: 1, end: 4 }), range({ start: 4, end: 7 }), [7, 8, 9]);
        assert.deepEqual(Array.from(iter), [[1, 4, 7], [2, 5, 8], [3, 6, 9] ]);
      });

      it('zip stopping early', function () {
        var iter = zipLongest('x', range({ start: 1, end: 4 }), range({ start: 4, end: 6 }), [7, 8]);
        assert.deepEqual(Array.from(iter), [[1, 4, 7], [2, 5, 8], [3, 'x', 'x'] ]);
      });
    });
  });
});
