"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [cycle].map(_regenerator2.default.mark);

function cycle(iterable) {
  var copy, _iterator, _isArray, _i, _ref, item;

  return _regenerator2.default.wrap(function cycle$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!Array.isArray(iterable)) {
            _context.next = 7;
            break;
          }

        case 1:
          if (!true) {
            _context.next = 5;
            break;
          }

          return _context.delegateYield(iterable, "t0", 3);

        case 3:
          _context.next = 1;
          break;

        case 5:
          _context.next = 26;
          break;

        case 7:
          copy = [];
          _iterator = iterable, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

        case 9:
          if (!_isArray) {
            _context.next = 15;
            break;
          }

          if (!(_i >= _iterator.length)) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("break", 25);

        case 12:
          _ref = _iterator[_i++];
          _context.next = 19;
          break;

        case 15:
          _i = _iterator.next();

          if (!_i.done) {
            _context.next = 18;
            break;
          }

          return _context.abrupt("break", 25);

        case 18:
          _ref = _i.value;

        case 19:
          item = _ref;

          copy.push(item);
          _context.next = 23;
          return item;

        case 23:
          _context.next = 9;
          break;

        case 25:
          return _context.delegateYield(cycle(copy), "t1", 26);

        case 26:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

module.exports = cycle;