import { $, $async, $await } from '../../../../generate/async.macro';

import { $size, range } from '../../..';

describe($`size`, () => {
  it(
    'return length of array',
    $async(() => {
      expect($await($size([1, 2, 3, 4, 5, 6]))).toBe(6);
    }),
  );

  it(
    'returns the size of a typed array',
    $async(() => {
      expect($await($size(new Int8Array([1, 2, 3])))).toBe(3);
      expect($await($size(new Int16Array([1, 2, 3])))).toBe(3);
    }),
  );

  it(
    'returns 0 for null or undefined',
    $async(() => {
      expect($await($size(null))).toBe(0);
      expect($await($size(undefined))).toBe(0);
    }),
  );

  it(
    'returns the size of a map',
    $async(() => {
      expect($await($size(new Map([[1, 1], [2, 2]])))).toBe(2);
    }),
  );

  it(
    'returns the size of a class with a size property',
    $async(() => {
      class SizeOne {
        get size() {
          return 1;
        }

        *[Symbol.iterator]() {
          yield* [];
        }
      }

      expect($await($size(new SizeOne()))).toBe(1);
    }),
  );

  it(
    'return number of items in iterable',
    $async(() => {
      expect($await($size(range({ start: 1, end: 7 })))).toBe(6);
    }),
  );
});
