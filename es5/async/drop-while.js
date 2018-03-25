'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncIterator2 = require('babel-runtime/helpers/asyncIterator');

var _asyncIterator3 = _interopRequireDefault(_asyncIterator2);

var _asyncGenerator2 = require('babel-runtime/helpers/asyncGenerator');

var _asyncGenerator3 = _interopRequireDefault(_asyncGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var asyncIter = require('./async-iter');

function dropWhile(func, iterable) {
  var curriedDropWhile = function () {
    var _ref = _asyncGenerator3.default.wrap( /*#__PURE__*/_regenerator2.default.mark(function _callee(i) {
      var drop, c, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, item;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              drop = true;
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
                _context.next = 28;
                break;
              }

              item = _value;

              if (drop) {
                _context.next = 21;
                break;
              }

              _context.next = 19;
              return item;

            case 19:
              _context.next = 25;
              break;

            case 21:
              drop = func(item, c++);

              if (drop) {
                _context.next = 25;
                break;
              }

              _context.next = 25;
              return item;

            case 25:
              _iteratorNormalCompletion = true;
              _context.next = 7;
              break;

            case 28:
              _context.next = 34;
              break;

            case 30:
              _context.prev = 30;
              _context.t0 = _context['catch'](5);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 34:
              _context.prev = 34;
              _context.prev = 35;

              if (!(!_iteratorNormalCompletion && _iterator.return)) {
                _context.next = 39;
                break;
              }

              _context.next = 39;
              return _asyncGenerator3.default.await(_iterator.return());

            case 39:
              _context.prev = 39;

              if (!_didIteratorError) {
                _context.next = 42;
                break;
              }

              throw _iteratorError;

            case 42:
              return _context.finish(39);

            case 43:
              return _context.finish(34);

            case 44:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[5, 30, 34, 44], [35,, 39, 43]]);
    }));

    return function curriedDropWhile(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  if (iterable) {
    return curriedDropWhile(iterable);
  }
  return curriedDropWhile;
}

module.exports = dropWhile;