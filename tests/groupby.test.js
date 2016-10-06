var assert = require('chai').assert;
var groupby_es6 = require('../lib/groupby');
var groupby_es5 = require('../es5/groupby');

var esversion = ['es6', 'es5'];

describe('groupby', function () {
  [groupby_es6, groupby_es5].forEach(function (groupby, i) {
    describe(esversion[i], function () {
      it('groupby main cursor', function () {
        var iter = groupby('AAABBAACCCCD');
        var next;
        next = iter.next();
        assert.equal(next.value[0], 'A');
        next = iter.next();
        assert.equal(next.value[0], 'B');
        next = iter.next();
        assert.equal(next.value[0], 'A');
        next = iter.next();
        assert.equal(next.value[0], 'C');
        next = iter.next();
        assert.equal(next.value[0], 'D');
        next = iter.next();
        assert.equal(next.done, true);
      });

      it('groupby secondary', function () {
        var iter = groupby('AAABBAACCCCD');
        var next;
        next = iter.next();
        assert.equal(next.value[0], 'A');
        assert.deepEqual(Array.from(next.value[1]), ['A', 'A', 'A']);
        next = iter.next();
        assert.equal(next.value[0], 'B');
        assert.deepEqual(Array.from(next.value[1]), ['B', 'B']);
        next = iter.next();
        assert.equal(next.value[0], 'A');
        assert.deepEqual(Array.from(next.value[1]), ['A', 'A']);
        next = iter.next();
        assert.equal(next.value[0], 'C');
        assert.deepEqual(Array.from(next.value[1]), ['C', 'C', 'C', 'C']);
        next = iter.next();
        assert.equal(next.value[0], 'D');
        assert.deepEqual(Array.from(next.value[1]), ['D']);
        next = iter.next();
        assert.equal(next.done, true);
      });

      it('groupby secondary (consume partially)', function () {
        var iter = groupby('AAABBAACCCCD');
        var next;
        next = iter.next();
        assert.equal(next.value[0], 'A');
        assert.deepEqual(next.value[1].next().value, 'A');
        assert.deepEqual(next.value[1].next().value, 'A');
        assert.deepEqual(next.value[1].next().value, 'A');
        assert.deepEqual(next.value[1].next().done, true);
        next = iter.next();
        assert.equal(next.value[0], 'B');
        // ...
      });
    });
  });
});
