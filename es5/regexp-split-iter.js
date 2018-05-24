'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var regexSplit = require('./regexp-split');

function regexpSplitIter(re, options, iterable) {
  var _marked = /*#__PURE__*/_regenerator2.default.mark(iter);

  if (typeof options === 'undefined' || options.constructor !== Object) {
    iterable = options;
    options = {};
  }
  function iter(iterable) {
    var buffer, queue, mergeEmpty, _iterator, _isArray, _i, _ref, chunk, _iterator2, _isArray2, _i2, _ref2, strIter;

    return _regenerator2.default.wrap(function iter$(_context) {
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

            return _context.abrupt('break', 47);

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

            return _context.abrupt('break', 47);

          case 13:
            _ref = _i.value;

          case 14:
            chunk = _ref;

            if (!(chunk === '')) {
              _context.next = 17;
              break;
            }

            return _context.abrupt('continue', 45);

          case 17:
            queue = [];
            buffer += chunk;
            console.log('buffer', '"' + buffer + '"');
            _iterator2 = regexSplit(re, options, buffer), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);

          case 21:
            if (!_isArray2) {
              _context.next = 27;
              break;
            }

            if (!(_i2 >= _iterator2.length)) {
              _context.next = 24;
              break;
            }

            return _context.abrupt('break', 43);

          case 24:
            _ref2 = _iterator2[_i2++];
            _context.next = 31;
            break;

          case 27:
            _i2 = _iterator2.next();

            if (!_i2.done) {
              _context.next = 30;
              break;
            }

            return _context.abrupt('break', 43);

          case 30:
            _ref2 = _i2.value;

          case 31:
            strIter = _ref2;

            if (!(mergeEmpty && strIter === '')) {
              _context.next = 35;
              break;
            }

            mergeEmpty = false;
            return _context.abrupt('continue', 41);

          case 35:
            mergeEmpty = false;
            queue.push(strIter);
            console.log('queue', queue);

            if (!(queue.length === 2)) {
              _context.next = 41;
              break;
            }

            _context.next = 41;
            return queue.shift();

          case 41:
            _context.next = 21;
            break;

          case 43:
            mergeEmpty = queue[queue.length - 1] === '';
            buffer = queue.join('');

          case 45:
            _context.next = 4;
            break;

          case 47:
            if (!(queue && queue.length)) {
              _context.next = 49;
              break;
            }

            return _context.delegateYield(queue, 't0', 49);

          case 49:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked, this);
  }
  if (typeof iterable === 'undefined') {
    return iter;
  }
  return iter(iterable);
}

module.exports = regexpSplitIter;