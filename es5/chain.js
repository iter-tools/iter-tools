'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(chain);

var iter = require('./iter');

function chain() {
  var i,
      _args = arguments;
  return _regenerator2.default.wrap(function chain$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          i = 0;

        case 1:
          if (!(i < _args.length)) {
            _context.next = 6;
            break;
          }

          return _context.delegateYield(iter(_args[i]), 't0', 3);

        case 3:
          i++;
          _context.next = 1;
          break;

        case 6:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

module.exports = chain;