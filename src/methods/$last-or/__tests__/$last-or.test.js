import { $isAsync, $async, $await } from '../../../../generate/async.macro';
import { $lastOr, $wrap } from '../../..';

describe($async`lastOr`, () => {
  it(
    'Returns the last item in the iterable',
    $async(() => {
      expect($await($lastOr(0, $wrap([1, 2, 3])))).toEqual(3);
    }),
  );

  if (!$isAsync) {
    it(
      'Returns the last item in an array',
      $async(() => {
        expect($lastOr(0, [1, 2, 3])).toEqual(3);
      }),
    );
  }

  describe('when iterable is empty', () => {
    it(
      'returns whenEmpty',
      $async(() => {
        expect($await($lastOr(null, $wrap([])))).toBe(null);
      }),
    );
  });
});
