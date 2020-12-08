import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $consume } from 'iter-tools-es';
import { $wrap } from '../../../test/$helpers.js';

describe($`consume (deprecated)`, () => {
  it(
    'consumes an iterable with a callback',
    $async(() => {
      const arr = [];
      $await(
        $consume(
          $async((value) => arr.push(value)),
          $wrap([1, 2, 3]),
        ),
      );
      $await(
        $consume(
          $async((value) => arr.push(value)),
          $wrap([1, 2, 3]),
        ),
      );
      expect(arr).toEqual([1, 2, 3, 1, 2, 3]);
      expect(console.warn).callsMatchSnapshot();
    }),
  );
});
