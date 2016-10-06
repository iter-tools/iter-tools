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
  var _marked = [teeGen].map(_regenerator2.default.mark);

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
            if (!true) {
              _context.next = 19;
              break;
            }

            if (!a.length) {
              _context.next = 6;
              break;
            }

            _context.next = 4;
            return a.shift();

          case 4:
            _context.next = 17;
            break;

          case 6:
            if (!done) {
              _context.next = 8;
              break;
            }

            return _context.abrupt('return');

          case 8:
            newItem = iterable.next();

            if (!newItem.done) {
              _context.next = 14;
              break;
            }

            done = true;
            return _context.abrupt('return');

          case 14:
            arrays.forEach(function (ar) {
              ar.push(newItem.value);
            });
            _context.next = 17;
            return a.shift();

          case 17:
            _context.next = 0;
            break;

          case 19:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked[0], this);
  }
  return arrays.map(function (a) {
    return teeGen(a);
  });
}

module.exports = tee;