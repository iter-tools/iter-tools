'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var iter = require('./iter');

function takeWhile(func, iterable) {
  var _marked = [curriedTakeWhile].map(_regenerator2.default.mark);

  function curriedTakeWhile(i) {
    var take, _iterator, _isArray, _i, _ref, item;

    return _regenerator2.default.wrap(function curriedTakeWhile$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            take = true;
            _iterator = iter(i), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

          case 2:
            if (!_isArray) {
              _context.next = 8;
              break;
            }

            if (!(_i >= _iterator.length)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt('break', 22);

          case 5:
            _ref = _iterator[_i++];
            _context.next = 12;
            break;

          case 8:
            _i = _iterator.next();

            if (!_i.done) {
              _context.next = 11;
              break;
            }

            return _context.abrupt('break', 22);

          case 11:
            _ref = _i.value;

          case 12:
            item = _ref;

            take = func(item);

            if (!take) {
              _context.next = 19;
              break;
            }

            _context.next = 17;
            return item;

          case 17:
            _context.next = 20;
            break;

          case 19:
            return _context.abrupt('break', 22);

          case 20:
            _context.next = 2;
            break;

          case 22:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked[0], this);
  }
  if (iterable) {
    return curriedTakeWhile(iterable);
  }
  return curriedTakeWhile;
}

module.exports = takeWhile;