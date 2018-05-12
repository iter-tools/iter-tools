'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncIterator2 = require('babel-runtime/helpers/asyncIterator');

var _asyncIterator3 = _interopRequireDefault(_asyncIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var asyncIter = require('./async-iter');

function reduce(func, iterable) {
  var curriedReduce = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(i) {
      var c, acc, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, item;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              c = 0;
              acc = void 0;
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 5;
              _iterator = (0, _asyncIterator3.default)(asyncIter(i));

            case 7:
              _context.next = 9;
              return _iterator.next();

            case 9:
              _step = _context.sent;
              _iteratorNormalCompletion = _step.done;
              _context.next = 13;
              return _step.value;

            case 13:
              _value = _context.sent;

              if (_iteratorNormalCompletion) {
                _context.next = 20;
                break;
              }

              item = _value;

              acc = func(acc, item, c++);

            case 17:
              _iteratorNormalCompletion = true;
              _context.next = 7;
              break;

            case 20:
              _context.next = 26;
              break;

            case 22:
              _context.prev = 22;
              _context.t0 = _context['catch'](5);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 26:
              _context.prev = 26;
              _context.prev = 27;

              if (!(!_iteratorNormalCompletion && _iterator.return)) {
                _context.next = 31;
                break;
              }

              _context.next = 31;
              return _iterator.return();

            case 31:
              _context.prev = 31;

              if (!_didIteratorError) {
                _context.next = 34;
                break;
              }

              throw _iteratorError;

            case 34:
              return _context.finish(31);

            case 35:
              return _context.finish(26);

            case 36:
              return _context.abrupt('return', acc);

            case 37:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[5, 22, 26, 36], [27,, 31, 35]]);
    }));

    return function curriedReduce(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  if (iterable) {
    return curriedReduce(iterable);
  }
  return curriedReduce;
}

module.exports = reduce;