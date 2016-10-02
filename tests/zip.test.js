var assert = require('chai').assert;
var zip_es6 = require('../lib/zip');
var zip_es5 = require('../es5/zip');
var range = require('../lib/range');

var esversion = ['es6', 'es5'];

describe('zip', function () {
  [zip_es6, zip_es5].forEach(function (zip, i) {
    describe(esversion[i], function () {
      it('zips', function () {
        var iter = zip([1, 2, 3], [4, 5, 6], [7, 8, 9]);
        assert.deepEqual(Array.from(iter), [[1, 4, 7], [2, 5, 8], [3, 6, 9] ]);
      });

      it('zips using iterables', function () {
        var iter = zip(range(1, 4), range(4, 7), [7, 8, 9]);
        assert.deepEqual(Array.from(iter), [[1, 4, 7], [2, 5, 8], [3, 6, 9] ]);
      });

      it('zips stopping early', function () {
        var iter = zip(range(1, 4), range(4, 7), [7, 8]);
        assert.deepEqual(Array.from(iter), [[1, 4, 7], [2, 5, 8] ]);
      });
    });
  });
});
