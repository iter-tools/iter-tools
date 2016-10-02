"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [wrap, zip].map(_regenerator2.default.mark);

function isExausted(item) {
  return item.done;
}

function wrap(iter) {
  var _iterator, _isArray, _i, _ref, item;

  return _regenerator2.default.wrap(function wrap$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _iterator = iter, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

        case 1:
          if (!_isArray) {
            _context.next = 7;
            break;
          }

          if (!(_i >= _iterator.length)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("break", 16);

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

          return _context.abrupt("break", 16);

        case 10:
          _ref = _i.value;

        case 11:
          item = _ref;
          _context.next = 14;
          return item;

        case 14:
          _context.next = 1;
          break;

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function zip() {
  var next,
      i,
      zipped,
      isExausted,
      iters,
      _args2 = arguments;
  return _regenerator2.default.wrap(function zip$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          iters = Array.prototype.map.call(_args2, function (i) {
            return wrap(i);
          });

        case 1:
          if (!true) {
            _context2.next = 16;
            break;
          }

          zipped = [];
          i = 0;

        case 4:
          if (!(i < iters.length)) {
            _context2.next = 12;
            break;
          }

          next = iters[i].next();

          if (!next.done) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return");

        case 8:
          zipped.push(next.value);

        case 9:
          i++;
          _context2.next = 4;
          break;

        case 12:
          _context2.next = 14;
          return zipped;

        case 14:
          _context2.next = 1;
          break;

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}

module.exports = zip;