import { $, $isAsync, $async, $await } from '../../../../generate/async.macro';

import { $find } from '../../..';

describe($`find`, () => {
  it(
    'returns found item',
    $async(() => {
      expect($await($find(item => item === 5, [1, 2, 3, 4, 5, 6]))).toBe(5);
    }),
  );

  it(
    'returns undefined if no item found',
    $async(() => {
      expect($await($find(_ => false, [1, 2, 3, 4, 5, 6]))).toBe(undefined);
    }),
  );

  it(
    'returns undefined when iterable is empty',
    $async(() => {
      expect($await($find((item: never) => item, null))).toBe(undefined);
    }),
  );

  if ($isAsync) {
    it('returns found item (using a promise)', async () => {
      expect(await $find(async item => item === 5, [1, 2, 3, 4, 5, 6])).toBe(5);
    });
  }
});
