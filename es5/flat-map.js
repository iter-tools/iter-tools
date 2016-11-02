'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var map = require('./map');

function flatMap(func, iterable) {
  var _marked = [curriedFlatMap].map(_regenerator2.default.mark);

  var mapIter = map(func);
  function curriedFlatMap(i) {
    var _iterator, _isArray, _i, _ref, item;

    return _regenerator2.default.wrap(function curriedFlatMap$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _iterator = mapIter(i), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

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
            item = _ref;
            return _context.delegateYield(item, 't0', 13);

          case 13:
            _context.next = 1;
            break;

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked[0], this);
  }
  if (iterable) {
    return curriedFlatMap(iterable);
  }
  return curriedFlatMap;
}

module.exports = flatMap;