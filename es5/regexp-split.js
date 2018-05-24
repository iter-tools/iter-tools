'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cloneRegexp = require('clone-regexp');

function regexpSplit(re, options, str) {
  var _marked = /*#__PURE__*/_regenerator2.default.mark(iter);

  if (typeof options === 'undefined' || options.constructor !== Object) {
    str = options;
    options = {};
  }
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
              _context.next = 16;
              break;
            }

            lastMatchLength = options.includeMatch ? 0 : match[0].length;

            if (!(options.includeMatch && i === re.lastIndex)) {
              _context.next = 9;
              break;
            }

            return _context.abrupt('continue', 13);

          case 9:
            _context.next = 11;
            return str.slice(i, re.lastIndex - lastMatchLength);

          case 11:
            if (re.global) {
              _context.next = 13;
              break;
            }

            return _context.abrupt('break', 16);

          case 13:
            i = re.lastIndex;
            _context.next = 5;
            break;

          case 16:
            _context.next = 18;
            return str.slice(i);

          case 18:
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