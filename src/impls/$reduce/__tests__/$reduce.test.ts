import { $, $isAsync, $async, $await } from '../../../../generate/async.macro.cjs';
import { $awaitError } from '../../../../generate/test.macro.cjs';

import { $reduce } from 'iter-tools-es';
import { $wrap } from '../../../test/$helpers.js';

describe($`reduce`, () => {
  describe('when iterable is empty', () => {
    describe('when no initial value specified', () => {
      it(
        'throws',
        $async(() => {
          const error = $awaitError($reduce((acc: any, x) => acc + x, $wrap([])));

          expect(error).toBeInstanceOf(Error);
          expect(error.message).toMatchSnapshot();
        }),
      );
    });

    describe('when an initial value is specified', () => {
      it(
        'yields the specified initial value',
        $async(() => {
          expect($await($reduce(0, (acc, x) => acc + x, $wrap([])))).toBe(0);
        }),
      );
    });
  });

  describe('when source has values', () => {
    describe('when no initial value specified', () => {
      it(
        'sums an array',
        $async(() => {
          expect($await($reduce((acc, x) => acc + x, $wrap([1, 2, 3])))).toBe(6);
        }),
      );
    });

    describe('when an initial value is specified', () => {
      it(
        'sums using a specified initial value',
        $async(() => {
          expect($await($reduce(0, (acc, x) => acc + x, $wrap([1, 2, 3])))).toBe(6);
        }),
      );
    });
  });

  describe('when there is an error while reducing', () => {
    // eslint-disable-next-line jest/expect-expect
    it(
      'closes source',
      $async(() => {
        try {
          $await(
            $reduce(() => {
              throw new Error('Stop the presses!');
            }, $wrap([1, 2, 3])),
          );
        } catch (e) {}
      }),
    );
  });

  if ($isAsync) {
    it('can take an async reducer', async () => {
      expect(await $reduce(async (acc, x) => acc + x, $wrap([1, 2, 3]))).toBe(6);
    });
  }
});
