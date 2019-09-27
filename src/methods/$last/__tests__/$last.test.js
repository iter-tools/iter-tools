import { $isAsync, $async, $await } from '../../../../generate/async.macro';
import { $last, $wrap } from '../../..';

describe($async`last`, () => {
  it(
    'Returns the last item in the iterable',
    $async(() => {
      expect($await($last($wrap([1, 2, 3])))).toEqual(3);
    }),
  );

  if (!$isAsync) {
    it(
      'Returns the last item in an array',
      $async(() => {
        expect($last([1, 2, 3])).toEqual(3);
      }),
    );
  }

  describe('when iterable is empty', () => {
    it(
      'returns undefined',
      $async(() => {
        expect($await($last($wrap([])))).toBe(undefined);
      }),
    );
  });
});
