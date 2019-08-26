import { $async, $await } from '../../../../generate/async.macro';
import { $first, range } from '../../..';

describe($async`first`, () => {
  describe('when iterable contains items', () => {
    it(
      'returns first item',
      $async(() => {
        const iter = range(10);
        expect($await($first(iter))).toBe(0);
      }),
    );
  });

  describe('when iterable is empty', () => {
    it(
      'returns undefined',
      $async(() => {
        const iter = range(0);
        expect($await($first(iter))).toBe(undefined);
      }),
    );
  });
});
