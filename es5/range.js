'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [range].map(_regenerator2.default.mark);

function range(start, end, step) {
  var e, s, i;
  return _regenerator2.default.wrap(function range$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          step = typeof step === 'undefined' ? 1 : step;
          e = typeof end === 'undefined' ? start : end;
          s = typeof end === 'undefined' ? 0 : start;
          i = s;

        case 4:
          if (!(step > 0 ? i < e : i > e)) {
            _context.next = 10;
            break;
          }

          _context.next = 7;
          return i;

        case 7:
          i += step;
          _context.next = 4;
          break;

        case 10:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

module.exports = range;