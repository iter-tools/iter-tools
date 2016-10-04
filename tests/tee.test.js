var assert = require('chai').assert;
var tee_es6 = require('../lib/tee');
var tee_es5 = require('../es5/tee');
var range = require('../lib/range');

var esversion = ['es6', 'es5'];

describe('tee', function () {
  [tee_es6, tee_es5].forEach(function (tee, i) {
    describe(esversion[i], function () {
      it('tee iterable', function () {
        var iters = tee(range(3), 3);
        assert.equal(iters.length, 3);
        assert.equal(iters[0].next().value, 0);
        assert.equal(iters[0].next().value, 1);

        assert.equal(iters[1].next().value, 0);
        assert.equal(iters[1].next().value, 1);
        assert.equal(iters[1].next().value, 2);
        assert.equal(iters[1].next().done, true);

        assert.equal(iters[0].next().value, 2);
        assert.equal(iters[0].next().done, true);

        assert.equal(iters[2].next().value, 0);
        assert.equal(iters[2].next().value, 1);
        assert.equal(iters[2].next().value, 2);
        assert.equal(iters[2].next().done, true);
      });
    });
  });
});
