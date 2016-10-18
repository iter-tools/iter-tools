var iter = require('./iter');

function* chain() {
  for (var i = 0; i < arguments.length; i++) {
    yield* iter(arguments[i]);
  }
}

module.exports = chain;
