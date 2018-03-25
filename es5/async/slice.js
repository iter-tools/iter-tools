'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncIterator2 = require('babel-runtime/helpers/asyncIterator');

var _asyncIterator3 = _interopRequireDefault(_asyncIterator2);

var _asyncGenerator2 = require('babel-runtime/helpers/asyncGenerator');

var _asyncGenerator3 = _interopRequireDefault(_asyncGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var asyncIter = require('./async-iter');

function slice(opts, iterable) {
  var curriedSlice = function () {
    var _ref = _asyncGenerator3.default.wrap( /*#__PURE__*/_regenerator2.default.mark(function _callee(iterable) {
      var currentPos, nextValidPos, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, item;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              currentPos = 0;
              nextValidPos = start;
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 5;
              _iterator = (0, _asyncIterator3.default)(asyncIter(iterable));

            case 7:
              _context.next = 9;
              return _asyncGenerator3.default.await(_iterator.next());

            case 9:
              _step = _context.sent;
              _iteratorNormalCompletion = _step.done;
              _context.next = 13;
              return _asyncGenerator3.default.await(_step.value);

            case 13:
              _value = _context.sent;

              if (_iteratorNormalCompletion) {
                _context.next = 26;
                break;
              }

              item = _value;

              if (!(currentPos >= end)) {
                _context.next = 18;
                break;
              }

              return _context.abrupt('break', 26);

            case 18:
              if (!(nextValidPos === currentPos)) {
                _context.next = 22;
                break;
              }

              _context.next = 21;
              return item;

            case 21:
              nextValidPos += step;

            case 22:
              currentPos++;

            case 23:
              _iteratorNormalCompletion = true;
              _context.next = 7;
              break;

            case 26:
              _context.next = 32;
              break;

            case 28:
              _context.prev = 28;
              _context.t0 = _context['catch'](5);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 32:
              _context.prev = 32;
              _context.prev = 33;

              if (!(!_iteratorNormalCompletion && _iterator.return)) {
                _context.next = 37;
                break;
              }

              _context.next = 37;
              return _asyncGenerator3.default.await(_iterator.return());

            case 37:
              _context.prev = 37;

              if (!_didIteratorError) {
                _context.next = 40;
                break;
              }

              throw _iteratorError;

            case 40:
              return _context.finish(37);

            case 41:
              return _context.finish(32);

            case 42:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[5, 28, 32, 42], [33,, 37, 41]]);
    }));

    return function curriedSlice(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var start = void 0,
      step = void 0,
      end = void 0;
  opts = typeof opts === 'number' ? { end: opts, start: 0 } : opts;

  step = typeof opts.step === 'undefined' ? 1 : opts.step;
  end = typeof opts.end === 'undefined' ? step > 0 ? Infinity : -Infinity : opts.end;
  start = opts.start ? opts.start : 0;

  if (iterable) {
    return curriedSlice(iterable);
  }

  return curriedSlice;
}

module.exports = slice;