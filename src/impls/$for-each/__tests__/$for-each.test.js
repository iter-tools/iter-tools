import { $, $isAsync, $async, $await } from '../../../../generate/async.macro.cjs';

import { $forEach } from '@iter-tools/es';
import { $wrap } from '../../../test/$helpers.js';

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
