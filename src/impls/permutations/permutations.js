import { iterableCurry } from '../../internal/iterable.js';
import { factorial } from '../../internal/factorial.js';

function swap(arr, aIdx, bIdx) {
  const temp = arr[aIdx];
  arr[aIdx] = arr[bIdx];
  arr[bIdx] = temp;
}

function shiftToEnd(arr, idx) {
  const toShift = arr[idx]; // 1, 2, 3
  const end = arr.length - 1;
  for (let i = idx; i < end; i++) {
    arr[i] = arr[i + 1];
  }
  arr[arr.length - 1] = toShift;
}

function permutationsSize(len, r) {
  if (len === 0 || r === 0 || r > len) return 0;
  return Number(factorial(len, len - r));
}

export function permutations(iterable, k) {
  const arr = [...iterable];

  k = k === undefined ? arr.length : k;

  if (k < 0) {
    throw new TypeError('The k argument to permutations cannot be < 0');
  }

  let _size = null;

  return {
    *[Symbol.iterator]() {
      const ist = [0]; // i stack
      let start = 0; // start === ist.length - 1

      while (ist.length > 1 || ist[0] < arr.length) {
        swap(arr, start, start + ist[start]);
        if (ist.length === k) {
          yield arr.slice(0, k);
          ++ist[start];
        } else {
          ist.push(0);
          start++;
        }

        while (ist[start] === arr.length - start) {
          shiftToEnd(arr, start);
          ist.pop();
          start--;
          ist[start]++;
        }
      }
    },
    get size() {
      return _size === null ? (_size = permutationsSize(arr.length, k)) : _size;
    },
  };
}

export default /*#__PURE__*/ iterableCurry(permutations, {
  reduces: true,
  minArgs: 0,
  maxArgs: 1,
});
