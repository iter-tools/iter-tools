var assert = require('chai').assert;
var regexpSplit_es6 = require('../lib/regexp-split');
var regexpSplit_es5 = require('../es5/regexp-split');

var esversion = ['es6', 'es5'];

describe('regexpSplit', function () {
  [regexpSplit_es6, regexpSplit_es5].forEach(function (regexpSplit, i) {
    describe(esversion[i], function () {
      it('should split with global re', function () {
        var re = /\s+/g;
        var iter = regexpSplit(re, 'ab s   d');
        assert.deepEqual(Array.from(iter), 'ab s   d'.split(re));
      });
      it('should split with global re (2)', function () {
        var re = /\s+/g;
        var iter = regexpSplit(re, 'ab s   d  ');
        assert.deepEqual(Array.from(iter), 'ab s   d  '.split(re));
      });
      it('should split with non global re', function () {
        var re = /\s+/;
        var iter = regexpSplit(re, 'ab s   d');
        assert.deepEqual(Array.from(iter), 'ab s   d'.split(re));
      });
      it('should split with string', function () {
        var re = ' ';
        var iter = regexpSplit(re, 'ab s d');
        assert.deepEqual(Array.from(iter), 'ab s d'.split(' '));
      });
      it('should split with empty string', function () {
        var re = '';
        var iter = regexpSplit(re, 'abc');
        assert.deepEqual(Array.from(iter), 'abc'.split(re));
      });
    });
  });
});
