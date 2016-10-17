var assert = require('chai').assert;
var permutations_es6 = require('../lib/permutations');
var permutations_es5 = require('../es5/permutations');
var range = require('../lib/range');

var esversion = ['es6', 'es5'];

describe('permutations', function () {
  [permutations_es6, permutations_es5].forEach(function (permutations, i) {
    describe(esversion[i], function () {
      it('returns empty', function () {
        var iter = permutations([]);
        assert.deepEqual(Array.from(iter), []);
      });

      it('returns permutations', function () {
        var iter = permutations([1, 2]);
        assert.deepEqual(Array.from(iter), [[1, 2], [2, 1]]);
      });

      it('returns permutations', function () {
        var iter = permutations([1, 2, 3, 4], 2);
        var expected = [ [ 1, 2 ],
          [ 1, 3 ],
          [ 1, 4 ],
          [ 2, 1 ],
          [ 2, 3 ],
          [ 2, 4 ],
          [ 3, 1 ],
          [ 3, 2 ],
          [ 3, 4 ],
          [ 4, 1 ],
          [ 4, 2 ],
          [ 4, 3 ] ];

        assert.deepEqual(Array.from(iter), expected);
      });
    });
  });
});
