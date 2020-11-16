const range = require('../es/range');
const filter = require('../es/filter');

function isEven(x) {
  return x % 2 === 0;
}

const a = Array.from(range(1000));

module.exports['Array filter 1000 items'] = function() {
  return Array.from(a.filter(isEven));
};

module.exports['iter-tools filter 1000 items'] = function() {
  const iter = filter(isEven);
  return Array.from(iter(a));
};
