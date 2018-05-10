'use strict';

var range = require('./range');
var zip = require('./zip');

function enumerate(iterable) {
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  return zip(range({ start: start }), iterable);
}

module.exports = enumerate;