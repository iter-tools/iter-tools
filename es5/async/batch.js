'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncGenerator2 = require('babel-runtime/helpers/asyncGenerator');

var _asyncGenerator3 = _interopRequireDefault(_asyncGenerator2);

var batch = function () {
  var _ref = _asyncGenerator3.default.wrap( /*#__PURE__*/_regenerator2.default.mark(function _callee(iter, batchSize) {
    var b, _iterator, _isArray, _i, _ref2, item;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            iter = asyncIter(iter);
            batchSize = batchSize || 1;
            b = void 0;

          case 3:
            if (!true) {
              _context.next = 27;
              break;
            }

            _context.next = 6;
            return _asyncGenerator3.default.await(_promise2.default.all((0, _from2.default)(map(function () {
              return iter.next();
            }, range(batchSize)))));

          case 6:
            b = _context.sent;
            _iterator = b, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

          case 8:
            if (!_isArray) {
              _context.next = 14;
              break;
            }

            if (!(_i >= _iterator.length)) {
              _context.next = 11;
              break;
            }

            return _context.abrupt('break', 25);

          case 11:
            _ref2 = _iterator[_i++];
            _context.next = 18;
            break;

          case 14:
            _i = _iterator.next();

            if (!_i.done) {
              _context.next = 17;
              break;
            }

            return _context.abrupt('break', 25);

          case 17:
            _ref2 = _i.value;

          case 18:
            item = _ref2;

            if (!item.done) {
              _context.next = 21;
              break;
            }

            return _context.abrupt('return');

          case 21:
            _context.next = 23;
            return item.value;

          case 23:
            _context.next = 8;
            break;

          case 25:
            _context.next = 3;
            break;

          case 27:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function batch(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var asyncIter = require('./async-iter');
var range = require('../range');
var map = require('../map');

module.exports = batch;