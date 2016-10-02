var assert = require('chai').assert;
var cycle_es6 = require('../lib/cycle');
var cycle_es5 = require('../es5/cycle');

var esversion = ['es6', 'es5'];

describe('cycle', function () {
  [cycle_es6, cycle_es5].forEach(function (cycle, i) {
    describe(esversion[i], function () {
      it('return infinite cycle', function () {
        var iter = cycle([1, 2, 3]);
        assert.equal(iter.next().value, 1);
        assert.equal(iter.next().value, 2);
        assert.equal(iter.next().value, 3);
        assert.equal(iter.next().value, 1);
        assert.equal(iter.next().value, 2);
        assert.equal(iter.next().value, 3);
        assert.equal(iter.next().value, 1);
      });
    });
  });
});
