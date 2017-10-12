'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var iter = require('./iter');

function map(func, iterable) {
  var _marked = /*#__PURE__*/_regenerator2.default.mark(curriedMap);

  function curriedMap(i) {
    var c, _iterator, _isArray, _i, _ref, item;

    return _regenerator2.default.wrap(function curriedMap$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            c = 0;
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

            return _context.abrupt('break', 17);

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

            return _context.abrupt('break', 17);

          case 11:
            _ref = _i.value;

          case 12:
            item = _ref;
            _context.next = 15;
            return func(item, c++);

          case 15:
            _context.next = 2;
            break;

          case 17:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked, this);
  }
  if (iterable) {
    return curriedMap(iterable);
  }
  return curriedMap;
}

module.exports = map;