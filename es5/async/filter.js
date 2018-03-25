'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncIterator2 = require('babel-runtime/helpers/asyncIterator');

var _asyncIterator3 = _interopRequireDefault(_asyncIterator2);

var _asyncGenerator2 = require('babel-runtime/helpers/asyncGenerator');

var _asyncGenerator3 = _interopRequireDefault(_asyncGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var asyncIter = require('./async-iter');

function filter(func, iterable) {
  var curriedFilter = function () {
    var _ref = _asyncGenerator3.default.wrap( /*#__PURE__*/_regenerator2.default.mark(function _callee(i) {
      var c, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, item;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              c = 0;
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 4;
              _iterator = (0, _asyncIterator3.default)(asyncIter(i));

            case 6:
              _context.next = 8;
              return _asyncGenerator3.default.await(_iterator.next());

            case 8:
              _step = _context.sent;
              _iteratorNormalCompletion = _step.done;
              _context.next = 12;
              return _asyncGenerator3.default.await(_step.value);

            case 12:
              _value = _context.sent;

              if (_iteratorNormalCompletion) {
                _context.next = 21;
                break;
              }

              item = _value;

              if (!func(item, c++)) {
                _context.next = 18;
                break;
              }

              _context.next = 18;
              return item;

            case 18:
              _iteratorNormalCompletion = true;
              _context.next = 6;
              break;

            case 21:
              _context.next = 27;
              break;

            case 23:
              _context.prev = 23;
              _context.t0 = _context['catch'](4);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 27:
              _context.prev = 27;
              _context.prev = 28;

              if (!(!_iteratorNormalCompletion && _iterator.return)) {
                _context.next = 32;
                break;
              }

              _context.next = 32;
              return _asyncGenerator3.default.await(_iterator.return());

            case 32:
              _context.prev = 32;

              if (!_didIteratorError) {
                _context.next = 35;
                break;
              }

              throw _iteratorError;

            case 35:
              return _context.finish(32);

            case 36:
              return _context.finish(27);

            case 37:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[4, 23, 27, 37], [28,, 32, 36]]);
    }));

    return function curriedFilter(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  if (iterable) {
    return curriedFilter(iterable);
  }
  return curriedFilter;
}

module.exports = filter;