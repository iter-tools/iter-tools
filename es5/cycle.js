'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(cycle);

var iter = require('./iter');

function cycle(iterable) {
  var copy, _iterator, _isArray, _i, _ref, item;

  return _regenerator2.default.wrap(function cycle$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          copy = void 0;

          if (!Array.isArray(iterable)) {
            _context.next = 8;
            break;
          }

        case 2:
          if (!true) {
            _context.next = 6;
            break;
          }

          return _context.delegateYield(iterable, 't0', 4);

        case 4:
          _context.next = 2;
          break;

        case 6:
          _context.next = 27;
          break;

        case 8:
          copy = [];
          _iterator = iter(iterable), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

        case 10:
          if (!_isArray) {
            _context.next = 16;
            break;
          }

          if (!(_i >= _iterator.length)) {
            _context.next = 13;
            break;
          }

          return _context.abrupt('break', 26);

        case 13:
          _ref = _iterator[_i++];
          _context.next = 20;
          break;

        case 16:
          _i = _iterator.next();

          if (!_i.done) {
            _context.next = 19;
            break;
          }

          return _context.abrupt('break', 26);

        case 19:
          _ref = _i.value;

        case 20:
          item = _ref;

          copy.push(item);
          _context.next = 24;
          return item;

        case 24:
          _context.next = 10;
          break;

        case 26:
          return _context.delegateYield(cycle(copy), 't1', 27);

        case 27:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

module.exports = cycle;