import { $, $async, $await } from '../../../../generate/async.macro';

import { $consume } from '../../..';
import { $wrap } from '../../../test/$helpers';

describe($`consume`, () => {
  describe('when iterable is empty', () => {
    it(
      'does not error',
      $async(() => {
        expect($await($consume(null))).toBe(undefined);
        expect($await($consume(undefined))).toBe(undefined);
        expect($await($consume($wrap([])))).toBe(undefined);
      }),
    );
  });

  describe('when consuming an iterable has side effects', () => {
    it(
      'the effects are triggered',
      $async(() => {
        const arr: Array<number> = [];

        expect(
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
          ),
        ).toBe(undefined);
        expect(arr).toEqual([1, 2, 3]);
      }),
    );
  });
});
