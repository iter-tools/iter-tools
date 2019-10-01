const range = require('../es2018/range');
const filter = require('../es2018/filter');
const map = require('../es2018/map');
const compose = require('../es2018/compose');

function isEven(x) {
  return x % 2 === 0;
}

function power2(x) {
  return x * x;
}

const a = Array.from(range(1000));

module.exports['Array compose 1000 items'] = function() {
  return Array.from(a.map(power2).filter(isEven));
};

module.exports['iter-tools compose 1000 items'] = function() {
  const iter = compose(
    filter(isEven),
    map(power2),
  );
  return Array.from(iter(a));
};
