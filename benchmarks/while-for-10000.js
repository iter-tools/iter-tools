var range = require('../es/range');

const a = range(10000);

module.exports['for loop'] = function() {
  const arr = [];
  for (const i of a) {
    arr.push(i);
  }
};

module.exports['while loop'] = function() {
  const arr = [];
  while (true) {
    const next = a.next();
    if (next.done) break;
    arr.push(next.value);
  }
};
