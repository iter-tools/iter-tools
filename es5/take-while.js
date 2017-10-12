'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var iter = require('./iter');

function takeWhile(func, iterable) {
  var _marked = /*#__PURE__*/_regenerator2.default.mark(curriedTakeWhile);

  function curriedTakeWhile(i) {
    var take, c, _iterator, _isArray, _i, _ref, item;

    return _regenerator2.default.wrap(function curriedTakeWhile$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            take = true;
            c = 0;
            _iterator = iter(i), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

          case 3:
            if (!_isArray) {
              _context.next = 9;
              break;
            }

            if (!(_i >= _iterator.length)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt('break', 23);

          case 6:
            _ref = _iterator[_i++];
            _context.next = 13;
            break;

          case 9:
            _i = _iterator.next();

            if (!_i.done) {
              _context.next = 12;
              break;
            }

            return _context.abrupt('break', 23);

          case 12:
            _ref = _i.value;

          case 13:
            item = _ref;

            take = func(item, c++);

            if (!take) {
              _context.next = 20;
              break;
            }

            _context.next = 18;
            return item;

          case 18:
            _context.next = 21;
            break;

          case 20:
            return _context.abrupt('break', 23);

          case 21:
            _context.next = 3;
            break;

          case 23:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked, this);
  }
  if (iterable) {
    return curriedTakeWhile(iterable);
  }
  return curriedTakeWhile;
}

module.exports = takeWhile;