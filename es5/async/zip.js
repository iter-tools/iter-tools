'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncGenerator2 = require('babel-runtime/helpers/asyncGenerator');

var _asyncGenerator3 = _interopRequireDefault(_asyncGenerator2);

var zip = function () {
  var _ref = _asyncGenerator3.default.wrap( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var next,
        i,
        zipped,
        iters,
        _args = arguments;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            next = void 0, i = void 0, zipped = void 0;
            iters = Array.prototype.map.call(_args, function (arg) {
              return asyncIter(arg);
            });

          case 2:
            if (!true) {
              _context.next = 19;
              break;
            }

            zipped = [];
            i = 0;

          case 5:
            if (!(i < iters.length)) {
              _context.next = 15;
              break;
            }

            _context.next = 8;
            return _asyncGenerator3.default.await(iters[i].next());

          case 8:
            next = _context.sent;

            if (!next.done) {
              _context.next = 11;
              break;
            }

            return _context.abrupt('return');

          case 11:
            zipped.push(next.value);

          case 12:
            i++;
            _context.next = 5;
            break;

          case 15:
            _context.next = 17;
            return zipped;

          case 17:
            _context.next = 2;
            break;

          case 19:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function zip() {
    return _ref.apply(this, arguments);
  };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var asyncIter = require('./async-iter');

module.exports = zip;