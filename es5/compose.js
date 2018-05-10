"use strict";

var _from = require("babel-runtime/core-js/array/from");

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function compose(fns) {
  return (0, _from2.default)(fns).reduce(function (f, g) {
    return function () {
      return f(g.apply(undefined, arguments));
    };
  });
}

module.exports = compose;