'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(zipLongest);

var iter = require('./iter');

function zipLongest(filler) {
  var next,
      i,
      zipped,
      iters,
      numberOfExausted,
      _args = arguments;
  return _regenerator2.default.wrap(function zipLongest$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          iters = Array.prototype.slice.call(_args, 1).map(function (i) {
            return iter(i);
          });

        case 1:
          if (!true) {
            _context.next = 11;
            break;
          }

          zipped = [];
          numberOfExausted = 0;
          for (i = 0; i < iters.length; i++) {
            next = iters[i].next();
            if (next.done) {
              numberOfExausted++;
            }
            zipped.push(next.done ? filler : next.value);
          }

          if (!(iters.length === numberOfExausted)) {
            _context.next = 7;
            break;
          }

          return _context.abrupt('return');

        case 7:
          _context.next = 9;
          return zipped;

        case 9:
          _context.next = 1;
          break;

        case 11:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

module.exports = zipLongest;