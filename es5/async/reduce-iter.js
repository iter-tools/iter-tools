'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncIterator2 = require('babel-runtime/helpers/asyncIterator');

var _asyncIterator3 = _interopRequireDefault(_asyncIterator2);

var _asyncGenerator2 = require('babel-runtime/helpers/asyncGenerator');

var _asyncGenerator3 = _interopRequireDefault(_asyncGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var asyncIter = require('./async-iter');

function reduceIter(cb, acc, iterable) {
  var _iter = function () {
    var _ref = _asyncGenerator3.default.wrap( /*#__PURE__*/_regenerator2.default.mark(function _callee(iterable) {
      var c, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, item;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              iterable = asyncIter(iterable);
              c = 0;
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 5;
              _iterator = (0, _asyncIterator3.default)(iterable);

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
                _context.next = 22;
                break;
              }

              item = _value;

              acc = cb(acc, item, c++);
              _context.next = 19;
              return acc;

            case 19:
              _iteratorNormalCompletion = true;
              _context.next = 7;
              break;

            case 22:
              _context.next = 28;
              break;

            case 24:
              _context.prev = 24;
              _context.t0 = _context['catch'](5);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 28:
              _context.prev = 28;
              _context.prev = 29;

              if (!(!_iteratorNormalCompletion && _iterator.return)) {
                _context.next = 33;
                break;
              }

              _context.next = 33;
              return _asyncGenerator3.default.await(_iterator.return());

            case 33:
              _context.prev = 33;

              if (!_didIteratorError) {
                _context.next = 36;
                break;
              }

              throw _iteratorError;

            case 36:
              return _context.finish(33);

            case 37:
              return _context.finish(28);

            case 38:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[5, 24, 28, 38], [29,, 33, 37]]);
    }));

    return function _iter(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  if (iterable) {
    return _iter(iterable);
  }
  return _iter;
}

module.exports = reduceIter;