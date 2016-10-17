var iter = require('./iter');
var map = require('./map');
var range = require('./range');

function permutations(iterable, n) {
  var arr = Array.from(iterable);
  n = n || arr.length;
  if (n > arr.length) return;
  var indices = range(n);
  var cycles = range({start: n});
  while (n) {

  }
}

module.exports = permutations;


// indices = range(n)
// cycles = range(n, n-r, -1)
// yield tuple(pool[i] for i in indices[:r])
// while n:
//     for i in reversed(range(r)):
//         cycles[i] -= 1
//         if cycles[i] == 0:
//             indices[i:] = indices[i+1:] + indices[i:i+1]
//             cycles[i] = n - i
//         else:
//             j = cycles[i]
//             indices[i], indices[-j] = indices[-j], indices[i]
//             yield tuple(pool[i] for i in indices[:r])
//             break
//     else:
//         return
