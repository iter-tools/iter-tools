'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var iter = require('./iter');

function reduceIter(cb, acc, iterable) {
  var _marked = [_iter].map(_regenerator2.default.mark);

  function _iter(iterable) {
    var c, _iterator, _isArray, _i, _ref, item;

    return _regenerator2.default.wrap(function _iter$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            iterable = iter(iterable);
            c = 0;
            _iterator = iterable, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

          case 3:
            if (!_isArray) {
              _context.next = 9;
              break;
            }

            if (!(_i >= _iterator.length)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt('break', 19);

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

            return _context.abrupt('break', 19);

          case 12:
            _ref = _i.value;

          case 13:
            item = _ref;

            acc = cb(acc, item, c++);
            _context.next = 17;
            return [item, acc];

          case 17:
            _context.next = 3;
            break;

          case 19:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked[0], this);
  }
  if (iterable) {
    return _iter(iterable);
  }
  return _iter;
}

module.exports = reduceIter;