'use strict';

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var iter = require('./iter');

function product() {
  var _marked = /*#__PURE__*/_regenerator2.default.mark(multiply);

  var iters = Array.prototype.map.call(arguments, function (i) {
    return iter(i);
  });

  function multiply(iterable1, iterable2) {
    var _iterator, _isArray, _i, _ref, item1, _iterator2, _isArray2, _i2, _ref2, item2;

    return _regenerator2.default.wrap(function multiply$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _iterator = iterable1, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

          case 1:
            if (!_isArray) {
              _context.next = 7;
              break;
            }

            if (!(_i >= _iterator.length)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt('break', 30);

          case 4:
            _ref = _iterator[_i++];
            _context.next = 11;
            break;

          case 7:
            _i = _iterator.next();

            if (!_i.done) {
              _context.next = 10;
              break;
            }

            return _context.abrupt('break', 30);

          case 10:
            _ref = _i.value;

          case 11:
            item1 = _ref;
            _iterator2 = iterable2, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);

          case 13:
            if (!_isArray2) {
              _context.next = 19;
              break;
            }

            if (!(_i2 >= _iterator2.length)) {
              _context.next = 16;
              break;
            }

            return _context.abrupt('break', 28);

          case 16:
            _ref2 = _iterator2[_i2++];
            _context.next = 23;
            break;

          case 19:
            _i2 = _iterator2.next();

            if (!_i2.done) {
              _context.next = 22;
              break;
            }

            return _context.abrupt('break', 28);

          case 22:
            _ref2 = _i2.value;

          case 23:
            item2 = _ref2;
            _context.next = 26;
            return item1.concat(item2);

          case 26:
            _context.next = 13;
            break;

          case 28:
            _context.next = 1;
            break;

          case 30:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked, this);
  }

  if (iters.length === 0) {
    return (/*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee, this);
      })
    );
  } else {
    var currentIter = [[]];
    for (var _iterator3 = iters, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
      var _ref3;

      if (_isArray3) {
        if (_i3 >= _iterator3.length) break;
        _ref3 = _iterator3[_i3++];
      } else {
        _i3 = _iterator3.next();
        if (_i3.done) break;
        _ref3 = _i3.value;
      }

      var it = _ref3;

      currentIter = multiply(currentIter, (0, _from2.default)(it));
    }
    return currentIter;
  }
}

module.exports = product;