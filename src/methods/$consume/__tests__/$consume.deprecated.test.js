import { $, $async, $await } from '../../../../generate/async.macro';

import { $consume } from '../../..';
import { $wrap } from '../../../test/$helpers';

describe($`consume (deprecated)`, () => {
  it(
    'consumes an iterable with a callback',
    $async(() => {
      const arr: Array<number> = [];
      $await(
        $consume(
          $async((item) => arr.push(item)),
          $wrap([1, 2, 3]),
        ),
      );
      $await(
        $consume(
          $async((item) => arr.push(item)),
          $wrap([1, 2, 3]),
        ),
      );
      expect(arr).toEqual([1, 2, 3, 1, 2, 3]);
      expect(console.warn).callsMatchSnapshot();
    }),
  );
});
