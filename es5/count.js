'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [count].map(_regenerator2.default.mark);

function count(start, step) {
  var i;
  return _regenerator2.default.wrap(function count$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          step = typeof step === 'undefined' ? 1 : step;
          start = typeof start === 'undefined' ? 0 : start;
          i = start;

        case 3:
          if (!true) {
            _context.next = 9;
            break;
          }

          _context.next = 6;
          return i;

        case 6:
          i += step;
          _context.next = 3;
          break;

        case 9:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

module.exports = count;