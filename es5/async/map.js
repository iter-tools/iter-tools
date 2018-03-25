'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncIterator2 = require('babel-runtime/helpers/asyncIterator');

var _asyncIterator3 = _interopRequireDefault(_asyncIterator2);

var _asyncGenerator2 = require('babel-runtime/helpers/asyncGenerator');

var _asyncGenerator3 = _interopRequireDefault(_asyncGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var asyncIter = require('./async-iter');

function map(func, iterable) {
  var curriedMap = function () {
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
                _context.next = 20;
                break;
              }

              item = _value;
              _context.next = 17;
              return func(item, c++);

            case 17:
              _iteratorNormalCompletion = true;
              _context.next = 6;
              break;

            case 20:
              _context.next = 26;
              break;

            case 22:
              _context.prev = 22;
              _context.t0 = _context['catch'](4);
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
              return _asyncGenerator3.default.await(_iterator.return());

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
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[4, 22, 26, 36], [27,, 31, 35]]);
    }));

    return function curriedMap(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  if (iterable) {
    return curriedMap(iterable);
  }
  return curriedMap;
}

module.exports = map;