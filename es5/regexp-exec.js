'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function regexpExec(re, str) {
  var _marked = /*#__PURE__*/_regenerator2.default.mark(iter);

  function iter(str) {
    var match;
    return _regenerator2.default.wrap(function iter$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(null !== (match = re.exec(str)))) {
              _context.next = 7;
              break;
            }

            _context.next = 3;
            return match;

          case 3:
            if (re.global) {
              _context.next = 5;
              break;
            }

            return _context.abrupt('return');

          case 5:
            _context.next = 0;
            break;

          case 7:
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

module.exports = regexpExec;