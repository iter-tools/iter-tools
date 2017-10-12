'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(range);

function range(opts) {
  var start, step, end, i;
  return _regenerator2.default.wrap(function range$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          opts = typeof opts === 'number' ? { end: opts, start: 0 } : (typeof opts === 'undefined' ? 'undefined' : (0, _typeof3.default)(opts)) === 'object' ? opts : {};
          step = typeof opts.step === 'undefined' ? 1 : opts.step;
          end = typeof opts.end === 'undefined' ? step > 0 ? Infinity : -Infinity : opts.end;
          start = opts.start ? opts.start : 0;

          i = start;

        case 5:
          if (!(step > 0 ? i < end : i > end)) {
            _context.next = 11;
            break;
          }

          _context.next = 8;
          return i;

        case 8:
          i += step;
          _context.next = 5;
          break;

        case 11:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

module.exports = range;