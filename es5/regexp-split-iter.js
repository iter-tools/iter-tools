'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var regexSplit = require('./regexp-split');

function regexpSplitIter(re, iterable) {
  var _marked = /*#__PURE__*/_regenerator2.default.mark(_regexpSplitIter);

  function _regexpSplitIter(iterable) {
    var buffer, queue, mergeEmpty, _iterator, _isArray, _i, _ref, chunk, _iterator2, _isArray2, _i2, _ref2, strIter;

    return _regenerator2.default.wrap(function _regexpSplitIter$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            buffer = '';
            queue = void 0;
            mergeEmpty = false;
            _iterator = iterable, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

          case 4:
            if (!_isArray) {
              _context.next = 10;
              break;
            }

            if (!(_i >= _iterator.length)) {
              _context.next = 7;
              break;
            }

            return _context.abrupt('break', 45);

          case 7:
            _ref = _iterator[_i++];
            _context.next = 14;
            break;

          case 10:
            _i = _iterator.next();

            if (!_i.done) {
              _context.next = 13;
              break;
            }

            return _context.abrupt('break', 45);

          case 13:
            _ref = _i.value;

          case 14:
            chunk = _ref;

            if (!(chunk === '')) {
              _context.next = 17;
              break;
            }

            return _context.abrupt('continue', 43);

          case 17:
            queue = [];
            buffer += chunk;
            _iterator2 = regexSplit(re, buffer), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);

          case 20:
            if (!_isArray2) {
              _context.next = 26;
              break;
            }

            if (!(_i2 >= _iterator2.length)) {
              _context.next = 23;
              break;
            }

            return _context.abrupt('break', 41);

          case 23:
            _ref2 = _iterator2[_i2++];
            _context.next = 30;
            break;

          case 26:
            _i2 = _iterator2.next();

            if (!_i2.done) {
              _context.next = 29;
              break;
            }

            return _context.abrupt('break', 41);

          case 29:
            _ref2 = _i2.value;

          case 30:
            strIter = _ref2;

            if (!(mergeEmpty && strIter === '')) {
              _context.next = 34;
              break;
            }

            mergeEmpty = false;
            return _context.abrupt('continue', 39);

          case 34:
            mergeEmpty = false;
            queue.push(strIter);

            if (!(queue.length === 2)) {
              _context.next = 39;
              break;
            }

            _context.next = 39;
            return queue.shift();

          case 39:
            _context.next = 20;
            break;

          case 41:
            mergeEmpty = queue[queue.length - 1] === '';
            buffer = queue.join('');

          case 43:
            _context.next = 4;
            break;

          case 45:
            if (!(queue && queue.length)) {
              _context.next = 47;
              break;
            }

            return _context.delegateYield(queue, 't0', 47);

          case 47:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked, this);
  }
  if (typeof iterable === 'undefined') {
    return _regexpSplitIter;
  }
  return _regexpSplitIter(iterable);
}

module.exports = regexpSplitIter;