'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var iter = require('./iter');

function map(func, iterable) {
  var _marked = [curriedMap].map(_regenerator2.default.mark);

  function curriedMap(i) {
    var _iterator, _isArray, _i, _ref, item;

    return _regenerator2.default.wrap(function curriedMap$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _iterator = iter(i), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

          case 1:
            if (!_isArray) {
              _context.next = 7;
              break;
            }

            if (!(_i >= _iterator.length)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt('break', 16);

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

            return _context.abrupt('break', 16);

          case 10:
            _ref = _i.value;

          case 11:
            item = _ref;
            _context.next = 14;
            return func(item);

          case 14:
            _context.next = 1;
            break;

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked[0], this);
  }
  if (iterable) {
    return curriedMap(iterable);
  }
  return curriedMap;
}

module.exports = map;