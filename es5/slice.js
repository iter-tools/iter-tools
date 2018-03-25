'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var iter = require('./iter');

function slice(opts, iterable) {
  var _marked = /*#__PURE__*/_regenerator2.default.mark(curriedSlice);

  var start = void 0,
      step = void 0,
      end = void 0;
  opts = typeof opts === 'number' ? { end: opts, start: 0 } : opts;

  step = typeof opts.step === 'undefined' ? 1 : opts.step;
  end = typeof opts.end === 'undefined' ? step > 0 ? Infinity : -Infinity : opts.end;
  start = opts.start ? opts.start : 0;

  function curriedSlice(iterable) {
    var currentPos, nextValidPos, _iterator, _isArray, _i, _ref, item;

    return _regenerator2.default.wrap(function curriedSlice$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            currentPos = 0;
            nextValidPos = start;
            _iterator = iter(iterable), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

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

            if (!(currentPos >= end)) {
              _context.next = 16;
              break;
            }

            return _context.abrupt('break', 23);

          case 16:
            if (!(nextValidPos === currentPos)) {
              _context.next = 20;
              break;
            }

            _context.next = 19;
            return item;

          case 19:
            nextValidPos += step;

          case 20:
            currentPos++;

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
    return curriedSlice(iterable);
  }

  return curriedSlice;
}

module.exports = slice;