'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cloneRegexp = require('clone-regexp');

function regexpSplit(re, str) {
  var _marked = /*#__PURE__*/_regenerator2.default.mark(iter);

  if (re && typeof re === 'string') {
    re = new RegExp(re, 'g');
  }
  if (re && !re.global) {
    re = cloneRegexp(re, { global: true });
  }
  function iter(str) {
    var i, match;
    return _regenerator2.default.wrap(function iter$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            i = void 0, match = void 0;

            if (re) {
              _context.next = 4;
              break;
            }

            return _context.delegateYield(str, 't0', 3);

          case 3:
            return _context.abrupt('return');

          case 4:
            i = 0;

          case 5:
            if (!(match = re.exec(str))) {
              _context.next = 13;
              break;
            }

            _context.next = 8;
            return str.slice(i, re.lastIndex - match[0].length);

          case 8:
            if (re.global) {
              _context.next = 10;
              break;
            }

            return _context.abrupt('break', 13);

          case 10:
            i = re.lastIndex;
            _context.next = 5;
            break;

          case 13:
            _context.next = 15;
            return str.slice(i);

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked, this);
  }
  if (typeof str === 'undefined') {
    return iter;
  }
  return iter(str);
}

module.exports = regexpSplit;