'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncGenerator2 = require('babel-runtime/helpers/asyncGenerator');

var _asyncGenerator3 = _interopRequireDefault(_asyncGenerator2);

var zipLongest = function () {
  var _ref = _asyncGenerator3.default.wrap( /*#__PURE__*/_regenerator2.default.mark(function _callee(filler) {
    var next,
        i,
        zipped,
        iters,
        numberOfExausted,
        _args = arguments;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            next = void 0, i = void 0, zipped = void 0;
            iters = Array.prototype.slice.call(_args, 1).map(function (arg) {
              return asyncIter(arg);
            });
            numberOfExausted = void 0;

          case 3:
            if (!true) {
              _context.next = 22;
              break;
            }

            zipped = [];
            numberOfExausted = 0;
            i = 0;

          case 7:
            if (!(i < iters.length)) {
              _context.next = 16;
              break;
            }

            _context.next = 10;
            return _asyncGenerator3.default.await(iters[i].next());

          case 10:
            next = _context.sent;

            if (next.done) {
              numberOfExausted++;
            }
            zipped.push(next.done ? filler : next.value);

          case 13:
            i++;
            _context.next = 7;
            break;

          case 16:
            if (!(iters.length === numberOfExausted)) {
              _context.next = 18;
              break;
            }

            return _context.abrupt('return');

          case 18:
            _context.next = 20;
            return zipped;

          case 20:
            _context.next = 3;
            break;

          case 22:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function zipLongest(_x) {
    return _ref.apply(this, arguments);
  };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var asyncIter = require('./async-iter');

module.exports = zipLongest;