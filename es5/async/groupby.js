'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncGenerator2 = require('babel-runtime/helpers/asyncGenerator');

var _asyncGenerator3 = _interopRequireDefault(_asyncGenerator2);

var groupby = function () {
  var _ref = _asyncGenerator3.default.wrap( /*#__PURE__*/_regenerator2.default.mark(function _callee2(iterable, key) {
    var group = function () {
      var _ref2 = _asyncGenerator3.default.wrap( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!true) {
                  _context.next = 13;
                  break;
                }

                _context.next = 3;
                return currentItem.value;

              case 3:
                _context.next = 5;
                return _asyncGenerator3.default.await(iterable.next());

              case 5:
                currentItem = _context.sent;

                if (!currentItem.done) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt('return');

              case 8:
                currentKey = key(currentItem.value);

                if (!(previousKey !== currentKey)) {
                  _context.next = 11;
                  break;
                }

                return _context.abrupt('return');

              case 11:
                _context.next = 0;
                break;

              case 13:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function group() {
        return _ref2.apply(this, arguments);
      };
    }();

    var currentItem, currentKey, previousKey;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            key = key || function (key) {
              return key;
            };
            iterable = asyncIter(iterable);

            currentItem = void 0;
            currentKey = void 0, previousKey = void 0;
            ;

            _context2.next = 7;
            return _asyncGenerator3.default.await(iterable.next());

          case 7:
            currentItem = _context2.sent;

          case 8:
            if (!true) {
              _context2.next = 23;
              break;
            }

            if (!currentItem.done) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt('return');

          case 11:
            currentKey = key(currentItem.value);

            if (!(previousKey !== currentKey)) {
              _context2.next = 18;
              break;
            }

            previousKey = currentKey;
            _context2.next = 16;
            return [currentKey, group()];

          case 16:
            _context2.next = 21;
            break;

          case 18:
            _context2.next = 20;
            return _asyncGenerator3.default.await(iterable.next());

          case 20:
            currentItem = _context2.sent;

          case 21:
            _context2.next = 8;
            break;

          case 23:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function groupby(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var asyncIter = require('./async-iter');

module.exports = groupby;