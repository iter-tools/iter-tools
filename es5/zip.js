'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(zip);

var iter = require('./iter');

function zip() {
  var next,
      i,
      zipped,
      iters,
      _args = arguments;
  return _regenerator2.default.wrap(function zip$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          iters = Array.prototype.map.call(_args, function (i) {
            return iter(i);
          });

        case 1:
          if (!true) {
            _context.next = 16;
            break;
          }

          zipped = [];
          i = 0;

        case 4:
          if (!(i < iters.length)) {
            _context.next = 12;
            break;
          }

          next = iters[i].next();

          if (!next.done) {
            _context.next = 8;
            break;
          }

          return _context.abrupt('return');

        case 8:
          zipped.push(next.value);

        case 9:
          i++;
          _context.next = 4;
          break;

        case 12:
          _context.next = 14;
          return zipped;

        case 14:
          _context.next = 1;
          break;

        case 16:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

module.exports = zip;