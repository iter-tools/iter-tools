var assert = require('chai').assert;
var count_es6 = require('../lib/count');
var count_es5 = require('../es5/count');

var esversion = ['es6', 'es5'];

describe('count', function () {
  [count_es6, count_es5].forEach(function (count, i) {
    describe(esversion[i], function () {
      it('return infinite count', function () {
        var iter = count({ start: 10 });
        assert.equal(iter.next().value, 10);
        assert.equal(iter.next().value, 11);
        assert.equal(iter.next().value, 12);
      });

      it('return infinite count with step', function () {
        var iter = count({start: 10, step: 5});
        assert.equal(iter.next().value, 10);
        assert.equal(iter.next().value, 15);
        assert.equal(iter.next().value, 20);
        assert.equal(iter.next().value, 25);
      });
    });
  });
});
