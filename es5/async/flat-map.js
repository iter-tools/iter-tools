'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncGenerator2 = require('babel-runtime/helpers/asyncGenerator');

var _asyncGenerator3 = _interopRequireDefault(_asyncGenerator2);

var _asyncIterator2 = require('babel-runtime/helpers/asyncIterator');

var _asyncIterator3 = _interopRequireDefault(_asyncIterator2);

var _asyncGeneratorDelegate2 = require('babel-runtime/helpers/asyncGeneratorDelegate');

var _asyncGeneratorDelegate3 = _interopRequireDefault(_asyncGeneratorDelegate2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var map = require('./map');

function flatMap(func, iterable) {
  var curriedFlatMap = function () {
    var _ref = _asyncGenerator3.default.wrap( /*#__PURE__*/_regenerator2.default.mark(function _callee(i) {
      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, item;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 3;
              _iterator = (0, _asyncIterator3.default)(mapIter(i));

            case 5:
              _context.next = 7;
              return _asyncGenerator3.default.await(_iterator.next());

            case 7:
              _step = _context.sent;
              _iteratorNormalCompletion = _step.done;
              _context.next = 11;
              return _asyncGenerator3.default.await(_step.value);

            case 11:
              _value = _context.sent;

              if (_iteratorNormalCompletion) {
                _context.next = 18;
                break;
              }

              item = _value;
              return _context.delegateYield((0, _asyncGeneratorDelegate3.default)((0, _asyncIterator3.default)(item), _asyncGenerator3.default.await), 't0', 15);

            case 15:
              _iteratorNormalCompletion = true;
              _context.next = 5;
              break;

            case 18:
              _context.next = 24;
              break;

            case 20:
              _context.prev = 20;
              _context.t1 = _context['catch'](3);
              _didIteratorError = true;
              _iteratorError = _context.t1;

            case 24:
              _context.prev = 24;
              _context.prev = 25;

              if (!(!_iteratorNormalCompletion && _iterator.return)) {
                _context.next = 29;
                break;
              }

              _context.next = 29;
              return _asyncGenerator3.default.await(_iterator.return());

            case 29:
              _context.prev = 29;

              if (!_didIteratorError) {
                _context.next = 32;
                break;
              }

              throw _iteratorError;

            case 32:
              return _context.finish(29);

            case 33:
              return _context.finish(24);

            case 34:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[3, 20, 24, 34], [25,, 29, 33]]);
    }));

    return function curriedFlatMap(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var mapIter = map(func);

  if (iterable) {
    return curriedFlatMap(iterable);
  }
  return curriedFlatMap;
}

module.exports = flatMap;