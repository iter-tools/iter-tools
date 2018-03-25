'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncIterator2 = require('babel-runtime/helpers/asyncIterator');

var _asyncIterator3 = _interopRequireDefault(_asyncIterator2);

var _asyncGenerator2 = require('babel-runtime/helpers/asyncGenerator');

var _asyncGenerator3 = _interopRequireDefault(_asyncGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var asyncIter = require('./async-iter');

function takeWhile(func, iterable) {
  var curriedTakeWhile = function () {
    var _ref = _asyncGenerator3.default.wrap( /*#__PURE__*/_regenerator2.default.mark(function _callee(i) {
      var take, c, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, item;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              take = true;
              c = 0;
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 5;
              _iterator = (0, _asyncIterator3.default)(asyncIter(i));

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

              take = func(item, c++);

              if (!take) {
                _context.next = 22;
                break;
              }

              _context.next = 20;
              return item;

            case 20:
              _context.next = 23;
              break;

            case 22:
              return _context.abrupt('break', 26);

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

    return function curriedTakeWhile(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  if (iterable) {
    return curriedTakeWhile(iterable);
  }
  return curriedTakeWhile;
}

module.exports = takeWhile;