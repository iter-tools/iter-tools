import { $async, $await } from '../../generate/async.macro';
import { $firstOr, range } from '..';

describe($async`firstOr`, () => {
  describe('when iterable contains items', () => {
    it(
      'returns first item',
      $async(() => {
        const iter = range(10);
        expect($await($firstOr(null, iter))).toBe(0);
      }),
    );
  });

  describe('when iterable is empty', () => {
    it(
      'returns whenEmpty',
      $async(() => {
        const iter = range(0);
        expect($await($firstOr(null, iter))).toBe(null);
      }),
    );
  });
});
