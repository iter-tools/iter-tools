var assert = require('chai').assert;
var execute_es6 = require('../lib/execute');
var execute_es5 = require('../es5/execute');

var esversion = ['es6', 'es5'];

describe('execute', function () {
  [execute_es6, execute_es5].forEach(function (execute, i) {
    describe(esversion[i], function () {
      it('execute forever', function () {
        var iter = execute(function () { return 1; });
        assert.equal(iter.next().value, 1);
        assert.equal(iter.next().value, 1);
        assert.equal(iter.next().value, 1);
        assert.equal(iter.next().value, 1);
      });
    });
  });
});
