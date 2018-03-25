"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncGenerator2 = require("babel-runtime/helpers/asyncGenerator");

var _asyncGenerator3 = _interopRequireDefault(_asyncGenerator2);

var execute = function () {
  var _ref = _asyncGenerator3.default.wrap( /*#__PURE__*/_regenerator2.default.mark(function _callee(func) {
    var args,
        _args = arguments;
    return _regenerator2.default.wrap(function _callee$(_context) {
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
    }, _callee, this);
  }));

  return function execute(_x) {
    return _ref.apply(this, arguments);
  };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = execute;