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
          next = void 0, i = void 0, zipped = void 0;
          iters = Array.prototype.map.call(_args, function (arg) {
            return iter(arg);
          });

        case 2:
          if (!true) {
            _context.next = 17;
            break;
          }

          zipped = [];
          i = 0;

        case 5:
          if (!(i < iters.length)) {
            _context.next = 13;
            break;
          }

          next = iters[i].next();

          if (!next.done) {
            _context.next = 9;
            break;
          }

          return _context.abrupt('return');

        case 9:
          zipped.push(next.value);

        case 10:
          i++;
          _context.next = 5;
          break;

        case 13:
          _context.next = 15;
          return zipped;

        case 15:
          _context.next = 2;
          break;

        case 17:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

module.exports = zip;