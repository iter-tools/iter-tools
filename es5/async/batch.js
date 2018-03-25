'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncGenerator2 = require('babel-runtime/helpers/asyncGenerator');

var _asyncGenerator3 = _interopRequireDefault(_asyncGenerator2);

var batch = function () {
  var _ref = _asyncGenerator3.default.wrap( /*#__PURE__*/_regenerator2.default.mark(function _callee(iter, batchSize) {
    var end, b, item;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            end = false;

            iter = asyncIter(iter);
            batchSize = batchSize || 1;
            b = void 0;

          case 4:
            if (end) {
              _context.next = 20;
              break;
            }

            _context.next = 7;
            return _asyncGenerator3.default.await(_promise2.default.all((0, _from2.default)(map(function () {
              return asyncIter.next();
            }, range(batchSize)))));

          case 7:
            b = _context.sent;
            _context.t0 = _regenerator2.default.keys(b);

          case 9:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 18;
              break;
            }

            item = _context.t1.value;

            if (!b.done) {
              _context.next = 14;
              break;
            }

            end = true;
            return _context.abrupt('break', 18);

          case 14:
            _context.next = 16;
            return b.value;

          case 16:
            _context.next = 9;
            break;

          case 18:
            _context.next = 4;
            break;

          case 20:
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