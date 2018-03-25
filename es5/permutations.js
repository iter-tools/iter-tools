'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(permutations);

var iter = require('./iter');
var map = require('./map');
var range = require('./range');
var tee = require('./tee');
var product = require('./product');

function permutations(iterable, r) {
  var arr, mapToIndex, n, _iterator, _isArray, _i, _ref, indices;

  return _regenerator2.default.wrap(function permutations$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          arr = (0, _from2.default)(iter(iterable));
          mapToIndex = map(function (i) {
            return arr[i];
          });
          n = arr.length;

          r = typeof r === 'undefined' ? n : r;

          if (!(r > n)) {
            _context.next = 6;
            break;
          }

          return _context.abrupt('return');

        case 6:
          _iterator = product.apply(undefined, tee(range(n), r)), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

        case 7:
          if (!_isArray) {
            _context.next = 13;
            break;
          }

          if (!(_i >= _iterator.length)) {
            _context.next = 10;
            break;
          }

          return _context.abrupt('break', 23);

        case 10:
          _ref = _iterator[_i++];
          _context.next = 17;
          break;

        case 13:
          _i = _iterator.next();

          if (!_i.done) {
            _context.next = 16;
            break;
          }

          return _context.abrupt('break', 23);

        case 16:
          _ref = _i.value;

        case 17:
          indices = _ref;

          if (!(new _set2.default(indices).size === r)) {
            _context.next = 21;
            break;
          }

          _context.next = 21;
          return (0, _from2.default)(mapToIndex(indices));

        case 21:
          _context.next = 7;
          break;

        case 23:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

module.exports = permutations;