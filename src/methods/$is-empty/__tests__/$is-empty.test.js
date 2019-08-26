import { $async, $await } from '../../../../generate/async.macro';
import { $isEmpty, range } from '../../..';

describe($async`isEmpty`, () => {
  describe('when iterable contains items', () => {
    it(
      'returns true',
      $async(() => {
        const iter = range(10);
        expect($await($isEmpty(iter))).toBe(false);
      }),
    );
  });

  describe('when iterable is empty', () => {
    it(
      'returns false',
      $async(() => {
        const iter = range(0);
        expect($await($isEmpty(iter))).toBe(true);
      }),
    );
  });
});
