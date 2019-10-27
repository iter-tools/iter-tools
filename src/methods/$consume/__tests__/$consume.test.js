import { $, $async, $await } from '../../../../generate/async.macro';

import { $consume } from '../../..';

describe($`consume`, () => {
  it(
    'consumes an iterable',
    $async(() => {
      const arr: Array<number> = [];
      $await(
        $consume(
          (function*() {
            arr.push(1);
            yield;
            arr.push(2);
            yield;
            arr.push(3);
          })(),
        ),
      );
      expect(arr).toEqual([1, 2, 3]);
    }),
  );
});
