'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncGenerator2 = require('babel-runtime/helpers/asyncGenerator');

var _asyncGenerator3 = _interopRequireDefault(_asyncGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var asyncIter = require('./async-iter');

function groupBy(key, iterable) {
  var curriedGroupBy = function () {
    var _ref = _asyncGenerator3.default.wrap( /*#__PURE__*/_regenerator2.default.mark(function _callee2(iterable) {
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
              iterable = asyncIter(iterable);

              currentItem = void 0;
              currentKey = void 0, previousKey = void 0;
              ;

              _context2.next = 6;
              return _asyncGenerator3.default.await(iterable.next());

            case 6:
              currentItem = _context2.sent;

            case 7:
              if (!true) {
                _context2.next = 22;
                break;
              }

              if (!currentItem.done) {
                _context2.next = 10;
                break;
              }

              return _context2.abrupt('return');

            case 10:
              currentKey = key(currentItem.value);

              if (!(previousKey !== currentKey)) {
                _context2.next = 17;
                break;
              }

              previousKey = currentKey;
              _context2.next = 15;
              return [currentKey, group()];

            case 15:
              _context2.next = 20;
              break;

            case 17:
              _context2.next = 19;
              return _asyncGenerator3.default.await(iterable.next());

            case 19:
              currentItem = _context2.sent;

            case 20:
              _context2.next = 7;
              break;

            case 22:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function curriedGroupBy(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  key = key || function (key) {
    return key;
  };


  if (typeof iterable !== 'undefined') {
    return curriedGroupBy(iterable);
  }
  return curriedGroupBy;
}

module.exports = groupBy;