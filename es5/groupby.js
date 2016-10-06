'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked2 = [groupby].map(_regenerator2.default.mark);

var iter = require('./iter');

function groupby(iterable, key) {
  var _marked, currentItem, currentKey, previousKey, group;

  return _regenerator2.default.wrap(function groupby$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          group = function group() {
            return _regenerator2.default.wrap(function group$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!true) {
                      _context.next = 11;
                      break;
                    }

                    _context.next = 3;
                    return currentItem.value;

                  case 3:
                    currentItem = iterable.next();

                    if (!currentItem.done) {
                      _context.next = 6;
                      break;
                    }

                    return _context.abrupt('return');

                  case 6:
                    currentKey = key(currentItem.value);

                    if (!(previousKey !== currentKey)) {
                      _context.next = 9;
                      break;
                    }

                    return _context.abrupt('return');

                  case 9:
                    _context.next = 0;
                    break;

                  case 11:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _marked[0], this);
          };

          _marked = [group].map(_regenerator2.default.mark);

          key = key || function (key) {
            return key;
          };
          iterable = iter(iterable);

          ;

          currentItem = iterable.next();

        case 6:
          if (!true) {
            _context2.next = 19;
            break;
          }

          if (!currentItem.done) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt('return');

        case 9:
          currentKey = key(currentItem.value);

          if (!(previousKey !== currentKey)) {
            _context2.next = 16;
            break;
          }

          previousKey = currentKey;
          _context2.next = 14;
          return [currentKey, group()];

        case 14:
          _context2.next = 17;
          break;

        case 16:
          currentItem = iterable.next();

        case 17:
          _context2.next = 6;
          break;

        case 19:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2[0], this);
}

module.exports = groupby;