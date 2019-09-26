import { $isAsync, $async, $await } from '../../../../generate/async.macro';
import { $reverse, $toArray, $wrap } from '../../..';

describe($async`reverse`, () => {
  it(
    'Reverses an iterable',
    $async(() => {
      expect($await($toArray($reverse($wrap([1, 2, 3]))))).toEqual([3, 2, 1]);
    }),
  );

  if (!$isAsync) {
    it(
      'Reverses an array',
      $async(() => {
        expect($toArray($reverse([1, 2, 3]))).toEqual([3, 2, 1]);
      }),
    );
  }
});
