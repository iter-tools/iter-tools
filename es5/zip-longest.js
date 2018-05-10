'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(zipLongest);

var iter = require('./iter');

function zipLongest(filler) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var iters, numberOfExausted, zipped, _iterator, _isArray, _i, _ref, _iter, _iter$next, done, value;

  return _regenerator2.default.wrap(function zipLongest$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          iters = args.map(function (x) {
            return iter(x);
          });

        case 1:
          if (!true) {
            _context.next = 27;
            break;
          }

          numberOfExausted = 0;
          zipped = [];
          _iterator = iters, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

        case 5:
          if (!_isArray) {
            _context.next = 11;
            break;
          }

          if (!(_i >= _iterator.length)) {
            _context.next = 8;
            break;
          }

          return _context.abrupt('break', 21);

        case 8:
          _ref = _iterator[_i++];
          _context.next = 15;
          break;

        case 11:
          _i = _iterator.next();

          if (!_i.done) {
            _context.next = 14;
            break;
          }

          return _context.abrupt('break', 21);

        case 14:
          _ref = _i.value;

        case 15:
          _iter = _ref;
          _iter$next = _iter.next(), done = _iter$next.done, value = _iter$next.value;

          if (done) {
            numberOfExausted++;
          }
          zipped.push(done ? filler : value);

        case 19:
          _context.next = 5;
          break;

        case 21:
          if (!(iters.length === numberOfExausted)) {
            _context.next = 23;
            break;
          }

          return _context.abrupt('return');

        case 23:
          _context.next = 25;
          return zipped;

        case 25:
          _context.next = 1;
          break;

        case 27:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

module.exports = zipLongest;