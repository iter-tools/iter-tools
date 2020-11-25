import { $, $isAsync, $async, $await } from '../../../../generate/async.macro';

import { $forEach } from '../../..';
import { $wrap } from '../../../test/$helpers';

describe($`forEach`, () => {
  it(
    'calls callback for each value in iterable',
    $async(() => {
      const arr: Array<number> = [];

      $await($forEach((item) => arr.push(item), $wrap([1, 2, 3])));

      expect(arr).toEqual([1, 2, 3]);
    }),
  );

  if ($isAsync) {
    it('may take an async callback', async () => {
      const arr: Array<number> = [];

      $await($forEach(async (item) => arr.push(item), $wrap([1, 2, 3])));

      expect(arr).toEqual([1, 2, 3]);
    });
  }
});
