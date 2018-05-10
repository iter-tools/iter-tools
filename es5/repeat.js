"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(repeat);

function repeat(obj) {
  var times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Infinity;
  return _regenerator2.default.wrap(function repeat$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!times--) {
            _context.next = 5;
            break;
          }

          _context.next = 3;
          return obj;

        case 3:
          _context.next = 0;
          break;

        case 5:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

module.exports = repeat;