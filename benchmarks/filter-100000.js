const range = require('../es2018/range');
const filter = require('../es2018/filter');

function isEven(x) {
  return x % 2 === 0;
}

const a = Array.from(range(100000));

module.exports['Array filter 100000 items'] = function() {
  return Array.from(a.filter(isEven));
};

module.exports['iter-tools filter 100000 items'] = function() {
  const iter = filter(isEven);
  return Array.from(iter(a));
};
