'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [repeat].map(_regenerator2.default.mark);

function repeat(obj, times) {
  return _regenerator2.default.wrap(function repeat$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          times = typeof times === 'undefined' ? Infinity : times;

        case 1:
          if (!times--) {
            _context.next = 6;
            break;
          }

          _context.next = 4;
          return obj;

        case 4:
          _context.next = 1;
          break;

        case 6:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

module.exports = repeat;