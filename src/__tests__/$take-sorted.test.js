import { $async, $await } from '../../generate/async.macro';
import { $takeSorted, $toArray } from '..';

describe($async`takeSorted`, () => {
  it(
    'return smallest iterable',
    $async(() => {
      const smallest3 = $takeSorted(3, [99, 12, 4, 6, 97, 44, 66, 77, 98]);
      expect($await($toArray(smallest3))).toEqual([97, 98, 99]);
      const smallest1 = $takeSorted(1, [99, 12, 4, 6, 97, 44, 66, 77, 98]);
      expect($await($toArray(smallest1))).toEqual([99]);
    }),
  );
  it(
    'return smallest iterable, using comparator',
    $async(() => {
      const smallest2 = $takeSorted((a, b) => a.length - b.length, 2, [
        'abc',
        'a',
        'abcd',
        'abcd',
        'abcdef',
        'ab',
      ]);
      expect($await($toArray(smallest2))).toEqual(['abcd', 'abcdef']);
    }),
  );
  it(
    'return smallest iterable, using curry',
    $async(() => {
      const smallest3 = $takeSorted(3)([99, 12, 4, 6, 97, 44, 66, 77, 98]);
      expect($await($toArray(smallest3))).toEqual([97, 98, 99]);
    }),
  );
});
