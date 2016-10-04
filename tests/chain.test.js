var assert = require('chai').assert;
var chain_es6 = require('../lib/chain');
var chain_es5 = require('../es5/chain');
var range = require('../lib/range');

var esversion = ['es6', 'es5'];

describe('chain', function () {
  [chain_es6, chain_es5].forEach(function (chain, i) {
    describe(esversion[i], function () {
      it('chains iterables', function () {
        var iter = chain(range({ start: 1, end: 4 }), [4, 5, 6]);
        assert.deepEqual(Array.from(iter), [1, 2, 3, 4, 5, 6]);
      });
    });
  });
});
