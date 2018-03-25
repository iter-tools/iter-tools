"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncGenerator2 = require("babel-runtime/helpers/asyncGenerator");

var _asyncGenerator3 = _interopRequireDefault(_asyncGenerator2);

var asyncIter = function () {
  var _ref = _asyncGenerator3.default.wrap( /*#__PURE__*/_regenerator2.default.mark(function _callee(syncIterable) {
    var _iterator, _isArray, _i, _ref2, elem;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _iterator = syncIterable, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

          case 1:
            if (!_isArray) {
              _context.next = 7;
              break;
            }

            if (!(_i >= _iterator.length)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("break", 16);

          case 4:
            _ref2 = _iterator[_i++];
            _context.next = 11;
            break;

          case 7:
            _i = _iterator.next();

            if (!_i.done) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("break", 16);

          case 10:
            _ref2 = _i.value;

          case 11:
            elem = _ref2;
            _context.next = 14;
            return elem;

          case 14:
            _context.next = 1;
            break;

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function asyncIter(_x) {
    return _ref.apply(this, arguments);
  };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = asyncIter;