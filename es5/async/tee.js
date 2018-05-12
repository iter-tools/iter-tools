'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncGenerator2 = require('babel-runtime/helpers/asyncGenerator');

var _asyncGenerator3 = _interopRequireDefault(_asyncGenerator2);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var range = require('../range');
var map = require('../map');
var asyncIter = require('./async-iter');
var Dequeue = require('dequeue');

function tee(iterable, number) {
  var teeGen = function () {
    var _ref = _asyncGenerator3.default.wrap( /*#__PURE__*/_regenerator2.default.mark(function _callee(a) {
      var newItem;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              newItem = void 0;

            case 1:
              if (!true) {
                _context.next = 22;
                break;
              }

              if (!a.length) {
                _context.next = 7;
                break;
              }

              _context.next = 5;
              return a.shift();

            case 5:
              _context.next = 20;
              break;

            case 7:
              if (!done) {
                _context.next = 9;
                break;
              }

              return _context.abrupt('return');

            case 9:
              _context.next = 11;
              return _asyncGenerator3.default.await(iterable.next());

            case 11:
              newItem = _context.sent;

              if (!newItem.done) {
                _context.next = 17;
                break;
              }

              done = true;
              return _context.abrupt('return');

            case 17:
              arrays.forEach(function (ar) {
                return ar.push(newItem.value);
              });
              _context.next = 20;
              return a.shift();

            case 20:
              _context.next = 1;
              break;

            case 22:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function teeGen(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  number = number || 2;
  iterable = asyncIter(iterable);
  var arrays = (0, _from2.default)(map(function () {
    return new Dequeue();
  }, range(number)));
  var done = false;

  return arrays.map(function (a) {
    return teeGen(a);
  });
}

module.exports = tee;