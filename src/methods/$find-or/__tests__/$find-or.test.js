import { $, $isAsync, $async, $await } from '../../../../generate/async.macro';

import { $findOr, $wrap } from '../../..';

describe($`findOr`, () => {
  it(
    'returns found item',
    $async(() => {
      expect($await($findOr(0, item => item === 5, $wrap([1, 2, 3, 4, 5, 6])))).toBe(5);
    }),
  );

  it(
    'returns notFoundValue if specified and no item found',
    $async(() => {
      expect($await($findOr(0, _ => false, $wrap([1, 2, 3, 4, 5, 6])))).toBe(0);
    }),
  );

  it(
    'returns notFoundValue when iterable is empty',
    $async(() => {
      expect($await($findOr(null, item => item, null))).toBe(null);
    }),
  );

  if ($isAsync) {
    it('returns found item (using a promise)', async () => {
      expect(await $findOr(0, async item => item === 5, $wrap([1, 2, 3, 4, 5, 6]))).toBe(5);
    });
  }
});
