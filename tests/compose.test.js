var assert = require('chai').assert;
var compose = require('async-deco/utils/compose');
var range = require('../lib/range');
var filter = require('../lib/filter');
var map = require('../lib/map');

function power2(x) {
  return x * x;
}

function isEven(x) {
  return (x % 2) === 0;
}

describe('compose', function () {
  it('composes iterables', function () {
    var iter = compose(map(power2), filter(isEven), map(power2));
    assert.deepEqual(Array.from(iter([1, 2, 3, 4])), [16, 256]);
  });
});
