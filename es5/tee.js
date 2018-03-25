'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var range = require('./range');
var map = require('./map');
var iter = require('./iter');
var Dequeue = require('dequeue');

function tee(iterable, number) {
  var _marked = /*#__PURE__*/_regenerator2.default.mark(teeGen);

  number = number || 2;
  iterable = iter(iterable);
  var arrays = (0, _from2.default)(map(function () {
    return new Dequeue();
  }, range(number)));
  var done = false;
  function teeGen(a) {
    var newItem;
    return _regenerator2.default.wrap(function teeGen$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            newItem = void 0;

          case 1:
            if (!true) {
              _context.next = 20;
              break;
            }

            if (!a.length) {
              _context.next = 7;
              break;
            }

            _context.next = 5;
            return a.shift();

          case 5:
            _context.next = 18;
            break;

          case 7:
            if (!done) {
              _context.next = 9;
              break;
            }

            return _context.abrupt('return');

          case 9:
            newItem = iterable.next();

            if (!newItem.done) {
              _context.next = 15;
              break;
            }

            done = true;
            return _context.abrupt('return');

          case 15:
            arrays.forEach(function (ar) {
              return ar.push(newItem.value);
            });
            _context.next = 18;
            return a.shift();

          case 18:
            _context.next = 1;
            break;

          case 20:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked, this);
  }
  return arrays.map(function (a) {
    return teeGen(a);
  });
}

module.exports = tee;