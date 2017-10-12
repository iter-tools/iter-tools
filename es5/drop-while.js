'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var iter = require('./iter');

function dropWhile(func, iterable) {
  var _marked = /*#__PURE__*/_regenerator2.default.mark(curriedDropWhile);

  function curriedDropWhile(i) {
    var drop, c, _iterator, _isArray, _i, _ref, item;

    return _regenerator2.default.wrap(function curriedDropWhile$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            drop = true;
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

            return _context.abrupt('break', 25);

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

            return _context.abrupt('break', 25);

          case 12:
            _ref = _i.value;

          case 13:
            item = _ref;

            if (drop) {
              _context.next = 19;
              break;
            }

            _context.next = 17;
            return item;

          case 17:
            _context.next = 23;
            break;

          case 19:
            drop = func(item, c++);

            if (drop) {
              _context.next = 23;
              break;
            }

            _context.next = 23;
            return item;

          case 23:
            _context.next = 3;
            break;

          case 25:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked, this);
  }
  if (iterable) {
    return curriedDropWhile(iterable);
  }
  return curriedDropWhile;
}

module.exports = dropWhile;