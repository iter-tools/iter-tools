var assert = require('chai').assert;
var repeat_es6 = require('../lib/repeat');
var repeat_es5 = require('../es5/repeat');

var esversion = ['es6', 'es5'];

describe('repeat', function () {
  [repeat_es6, repeat_es5].forEach(function (repeat, i) {
    describe(esversion[i], function () {
      it('return simple repeat', function () {
        assert.deepEqual(Array.from(repeat(10, 3)), [10, 10, 10]);
      });

      it('return infinite repeat', function () {
        var iter = repeat(10);
        assert.equal(iter.next().value, 10);
        assert.equal(iter.next().value, 10);
        assert.equal(iter.next().value, 10);
        assert.equal(iter.next().value, 10);
      });
    });
  });
});
