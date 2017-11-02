"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(execute);

function execute(func) {
  var args,
      _args = arguments;
  return _regenerator2.default.wrap(function execute$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          args = Array.prototype.slice.call(_args, 1);

        case 1:
          if (!true) {
            _context.next = 6;
            break;
          }

          _context.next = 4;
          return func.apply(this, args);

        case 4:
          _context.next = 1;
          break;

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

module.exports = execute;