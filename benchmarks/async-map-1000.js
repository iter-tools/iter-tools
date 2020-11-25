const range = require('../es/range');
const asyncMap = require('../es/async-map');
const asyncReduce = require('../es/async-reduce');

const { Readable, Transform } = require('stream');

function power2(x) {
  return x * x;
}

function concat(acc, n) {
  return acc.concat(n);
}

const a = Array.from(range(1000));

const numbersLimit = 1000;
const fastNumbers = () => {
  let num = 0;
  return new Readable({
    objectMode: true,
    read() {
      if (num > numbersLimit) {
        this.push(null);
        return;
      }
      this.push(++num);
    },
  });
};

const streamMap = (fn, options = {}) =>
  new Transform({
    // By default we are in object mode but this can be overwritten by the user
    objectMode: true,
    ...options,

    transform(chunk, encoding, callback) {
      let res;
      try {
        res = fn(chunk);
      } catch (e) {
        return callback(e);
      }
      callback(null, res);
    },
  });

const streamReduce = (fn, acc, options = {}) =>
  new Transform({
    objectMode: true,
    ...options,

    transform(chunk, encoding, callback) {
      try {
        acc = fn(acc, chunk);
      } catch (e) {
        return callback(e);
      }
      return callback();
    },

    flush(callback) {
      callback(null, acc);
    },
  });

module.exports['stream map 1000 items'] = {
  fn: async function (deferred) {
    const stream = fastNumbers().pipe(streamMap(power2)).pipe(streamReduce(concat, []));

    stream.on('data', (array) => {
      deferred.resolve();
    });
  },
  defer: true,
};

module.exports['iter-tools async map 1000 items'] = {
  fn: async function (deferred) {
    const iter = asyncMap(power2);

    await asyncReduce([], concat, iter(a));
    deferred.resolve();
  },
  defer: true,
};
