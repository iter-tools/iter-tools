const range = require('../es/range');
const map = require('../es/map');

function power2(x) {
  return x * x;
}

const a = Array.from(range(100000));

module.exports['Array map 100000 items'] = function() {
  return Array.from(a.map(power2));
};

module.exports['iter-tools map 100000 items'] = function() {
  const iter = map(power2);
  return Array.from(iter(a));
};
