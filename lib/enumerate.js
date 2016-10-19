var range = require('./range');
var zip = require('./zip');

function enumerate(iterable, start) {
  start = start || 0;
  return zip(range({ start: start }), iterable);
}

module.exports = enumerate;
