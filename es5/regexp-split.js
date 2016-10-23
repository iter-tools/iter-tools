'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cloneRegexp = require('clone-regexp');

function regexpSplit(re, str) {
  var _marked = [iter].map(_regenerator2.default.mark);

  if (re && typeof re === 'string') {
    re = new RegExp(re, 'g');
  }
  if (re && !re.global) {
    re = cloneRegexp(re, { global: true });
  }
  function iter(str) {
    var i;
    return _regenerator2.default.wrap(function iter$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (re) {
              _context.next = 3;
              break;
            }

            return _context.delegateYield(str, 't0', 2);

          case 2:
            return _context.abrupt('return');

          case 3:
            i = 0;

          case 4:
            if (!re.test(str)) {
              _context.next = 12;
              break;
            }

            _context.next = 7;
            return str.slice(i, re.lastIndex - RegExp.lastMatch.length);

          case 7:
            if (re.global) {
              _context.next = 9;
              break;
            }

            return _context.abrupt('break', 12);

          case 9:
            i = re.lastIndex;
            _context.next = 4;
            break;

          case 12:
            _context.next = 14;
            return str.slice(i);

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked[0], this);
  }
  if (typeof str === 'undefined') {
    return iter;
  }
  return iter(str);
}

module.exports = regexpSplit;