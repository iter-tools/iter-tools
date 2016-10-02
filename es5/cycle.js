"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [cycle].map(_regenerator2.default.mark);

function cycle(iterable) {
  return _regenerator2.default.wrap(function cycle$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!true) {
            _context.next = 4;
            break;
          }

          return _context.delegateYield(iterable, "t0", 2);

        case 2:
          _context.next = 0;
          break;

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

module.exports = cycle;