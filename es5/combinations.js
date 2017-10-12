'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(combinations);

var map = require('./map');
var range = require('./range');
var permutations = require('./permutations');
var iter = require('./iter');

function isSorted(arr) {
  if (arr.length < 2) return true;

  for (var i = 1; i < arr.length; i++) {
    if (arr[i - 1] > arr[i]) {
      return false;
    }
  }
  return true;
}

function combinations(iterable, r) {
  var arr, mapToIndex, n, _iterator, _isArray, _i, _ref, indices;

  return _regenerator2.default.wrap(function combinations$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          arr = (0, _from2.default)(iter(iterable));
          mapToIndex = map(function (i) {
            return arr[i];
          });
          n = arr.length;
          _iterator = permutations(range(n), r), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

        case 4:
          if (!_isArray) {
            _context.next = 10;
            break;
          }

          if (!(_i >= _iterator.length)) {
            _context.next = 7;
            break;
          }

          return _context.abrupt('break', 20);

        case 7:
          _ref = _iterator[_i++];
          _context.next = 14;
          break;

        case 10:
          _i = _iterator.next();

          if (!_i.done) {
            _context.next = 13;
            break;
          }

          return _context.abrupt('break', 20);

        case 13:
          _ref = _i.value;

        case 14:
          indices = _ref;

          if (!isSorted(indices)) {
            _context.next = 18;
            break;
          }

          _context.next = 18;
          return (0, _from2.default)(mapToIndex(indices));

        case 18:
          _context.next = 4;
          break;

        case 20:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

module.exports = combinations;