var assert = require('chai').assert;
var combinationsWithReplacement_es6 = require('../lib/combinations-with-replacement');
var combinationsWithReplacement_es5 = require('../es5/combinations-with-replacement');
var range = require('../lib/range');

var esversion = ['es6', 'es5'];

describe('combinationsWithReplacement', function () {
  [combinationsWithReplacement_es6, combinationsWithReplacement_es5].forEach(function (combinationsWithReplacement, i) {
    describe(esversion[i], function () {
      it('returns empty', function () {
        var iter = combinationsWithReplacement([]);
        assert.deepEqual(Array.from(iter), []);
      });

      it('returns combinationsWithReplacement', function () {
        var iter = combinationsWithReplacement([1, 2]);
        assert.deepEqual(Array.from(iter), [[1, 1], [1, 2], [2, 2]]);
      });

      it('returns combinationsWithReplacement (max n)', function () {
        var iter = combinationsWithReplacement([1, 2, 3, 4], 2);
        var expected = [
          [ 1, 1 ],
          [ 1, 2 ],
          [ 1, 3 ],
          [ 1, 4 ],
          [ 2, 2 ],
          [ 2, 3 ],
          [ 2, 4 ],
          [ 3, 3 ],
          [ 3, 4 ],
          [ 4, 4 ]];

        assert.deepEqual(Array.from(iter), expected);
      });
    });
  });
});
