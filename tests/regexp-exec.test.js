var assert = require('chai').assert;
var regexpExec_es6 = require('../lib/regexp-exec');
var regexpExec_es5 = require('../es5/regexp-exec');

var esversion = ['es6', 'es5'];

describe('regexpExec', function () {
  [regexpExec_es6, regexpExec_es5].forEach(function (regexpExec, i) {
    describe(esversion[i], function () {
      it('should find matches', function () {
        var re = /[0-9]{4}/g;
        var iter = regexpExec(re, '10/2/2013, 03/03/2015 12/4/1997');
        var results = [];
        for (let [i] of iter) {
          results.push(i);
        }
        assert.deepEqual(results, ['2013', '2015', '1997']);
      });
    });
  });
});
