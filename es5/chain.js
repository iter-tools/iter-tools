'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(chain);

var iter = require('./iter');

function chain() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var _iterator, _isArray, _i, _ref, iterable;

  return _regenerator2.default.wrap(function chain$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _iterator = args, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

        case 1:
          if (!_isArray) {
            _context.next = 7;
            break;
          }

          if (!(_i >= _iterator.length)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt('break', 15);

        case 4:
          _ref = _iterator[_i++];
          _context.next = 11;
          break;

        case 7:
          _i = _iterator.next();

          if (!_i.done) {
            _context.next = 10;
            break;
          }

          return _context.abrupt('break', 15);

        case 10:
          _ref = _i.value;

        case 11:
          iterable = _ref;
          return _context.delegateYield(iter(iterable), 't0', 13);

        case 13:
          _context.next = 1;
          break;

        case 15:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

module.exports = chain;