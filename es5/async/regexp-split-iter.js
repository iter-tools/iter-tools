'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncGenerator2 = require('babel-runtime/helpers/asyncGenerator');

var _asyncGenerator3 = _interopRequireDefault(_asyncGenerator2);

var _asyncIterator2 = require('babel-runtime/helpers/asyncIterator');

var _asyncIterator3 = _interopRequireDefault(_asyncIterator2);

var _asyncGeneratorDelegate2 = require('babel-runtime/helpers/asyncGeneratorDelegate');

var _asyncGeneratorDelegate3 = _interopRequireDefault(_asyncGeneratorDelegate2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var regexSplit = require('../regexp-split');

function regexpSplitIter(re, iterable) {
  var _regexpSplitIter = function () {
    var _ref = _asyncGenerator3.default.wrap( /*#__PURE__*/_regenerator2.default.mark(function _callee(iterable) {
      var buffer, queue, mergeEmpty, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, chunk, _iterator2, _isArray, _i, _ref2, strIter;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              buffer = '';
              queue = void 0;
              mergeEmpty = false;
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 6;
              _iterator = (0, _asyncIterator3.default)(iterable);

            case 8:
              _context.next = 10;
              return _asyncGenerator3.default.await(_iterator.next());

            case 10:
              _step = _context.sent;
              _iteratorNormalCompletion = _step.done;
              _context.next = 14;
              return _asyncGenerator3.default.await(_step.value);

            case 14:
              _value = _context.sent;

              if (_iteratorNormalCompletion) {
                _context.next = 48;
                break;
              }

              chunk = _value;

              if (!(chunk === '')) {
                _context.next = 19;
                break;
              }

              return _context.abrupt('continue', 45);

            case 19:
              queue = [];
              buffer += chunk;
              _iterator2 = regexSplit(re, buffer), _isArray = Array.isArray(_iterator2), _i = 0, _iterator2 = _isArray ? _iterator2 : (0, _getIterator3.default)(_iterator2);

            case 22:
              if (!_isArray) {
                _context.next = 28;
                break;
              }

              if (!(_i >= _iterator2.length)) {
                _context.next = 25;
                break;
              }

              return _context.abrupt('break', 43);

            case 25:
              _ref2 = _iterator2[_i++];
              _context.next = 32;
              break;

            case 28:
              _i = _iterator2.next();

              if (!_i.done) {
                _context.next = 31;
                break;
              }

              return _context.abrupt('break', 43);

            case 31:
              _ref2 = _i.value;

            case 32:
              strIter = _ref2;

              if (!(mergeEmpty && strIter === '')) {
                _context.next = 36;
                break;
              }

              mergeEmpty = false;
              return _context.abrupt('continue', 41);

            case 36:
              mergeEmpty = false;
              queue.push(strIter);

              if (!(queue.length === 2)) {
                _context.next = 41;
                break;
              }

              _context.next = 41;
              return queue.shift();

            case 41:
              _context.next = 22;
              break;

            case 43:
              mergeEmpty = queue[queue.length - 1] === '';
              buffer = queue.join('');

            case 45:
              _iteratorNormalCompletion = true;
              _context.next = 8;
              break;

            case 48:
              _context.next = 54;
              break;

            case 50:
              _context.prev = 50;
              _context.t0 = _context['catch'](6);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 54:
              _context.prev = 54;
              _context.prev = 55;

              if (!(!_iteratorNormalCompletion && _iterator.return)) {
                _context.next = 59;
                break;
              }

              _context.next = 59;
              return _asyncGenerator3.default.await(_iterator.return());

            case 59:
              _context.prev = 59;

              if (!_didIteratorError) {
                _context.next = 62;
                break;
              }

              throw _iteratorError;

            case 62:
              return _context.finish(59);

            case 63:
              return _context.finish(54);

            case 64:
              if (!(queue && queue.length)) {
                _context.next = 66;
                break;
              }

              return _context.delegateYield((0, _asyncGeneratorDelegate3.default)((0, _asyncIterator3.default)(queue), _asyncGenerator3.default.await), 't1', 66);

            case 66:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[6, 50, 54, 64], [55,, 59, 63]]);
    }));

    return function _regexpSplitIter(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  if (typeof iterable === 'undefined') {
    return _regexpSplitIter;
  }
  return _regexpSplitIter(iterable);
}

module.exports = regexpSplitIter;