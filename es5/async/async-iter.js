'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncGenerator2 = require('babel-runtime/helpers/asyncGenerator');

var _asyncGenerator3 = _interopRequireDefault(_asyncGenerator2);

var _asyncIterator2 = require('babel-runtime/helpers/asyncIterator');

var _asyncIterator3 = _interopRequireDefault(_asyncIterator2);

var _asyncGeneratorDelegate2 = require('babel-runtime/helpers/asyncGeneratorDelegate');

var _asyncGeneratorDelegate3 = _interopRequireDefault(_asyncGeneratorDelegate2);

var asyncIter = function () {
  var _ref = _asyncGenerator3.default.wrap( /*#__PURE__*/_regenerator2.default.mark(function _callee(syncIterable) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.delegateYield((0, _asyncGeneratorDelegate3.default)((0, _asyncIterator3.default)(iter(syncIterable)), _asyncGenerator3.default.await), 't0', 1);

          case 1:
          case 'end':
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

var iter = require('../iter');

module.exports = asyncIter;