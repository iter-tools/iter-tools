'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _iterator = require('babel-runtime/core-js/symbol/iterator');

var _iterator2 = _interopRequireDefault(_iterator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function iter(iterable) {
  var args = Array.prototype.slice.call(arguments, 1);
  if (iterable[_iterator2.default]) {
    return iterable[_iterator2.default].apply(iterable, args);
  } else if ((typeof iterable === 'undefined' ? 'undefined' : (0, _typeof3.default)(iterable)) === 'object' && 'next' in iterable) {
    return iterable;
  } else if (typeof iterable === 'function') {
    return iter(iterable.apply(undefined, args));
  } else if ((typeof iterable === 'undefined' ? 'undefined' : (0, _typeof3.default)(iterable)) === 'object') {
    return (/*#__PURE__*/_regenerator2.default.mark(function objectIter(obj) {
        var keys, i;
        return _regenerator2.default.wrap(function objectIter$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                keys = (0, _keys2.default)(obj);
                i = 0;

              case 2:
                if (!(i < keys.length)) {
                  _context.next = 8;
                  break;
                }

                _context.next = 5;
                return [keys[i], obj[keys[i]]];

              case 5:
                i++;
                _context.next = 2;
                break;

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, objectIter, this);
      })(iterable)
    );
  }
  throw new Error('The argument is not a generator or iterator');
}

module.exports = iter;