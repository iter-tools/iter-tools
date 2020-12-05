import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $peekerate, $str, $interposeSeq } from 'iter-tools-es';
import { $wrap, anyType } from '../../../test/$helpers.js';
import { $Iterable } from '../../../types/$iterable.js';

describe($`peekerate`, () => {
  it(
    'decorates iterator with the current value in the iterable',
    $async(() => {
      const peekerator = $await($peekerate($wrap([1, 2, 3])));
      const observed = [];

      while (!peekerator.done) {
        const { current, done, value } = peekerator;
        observed.push({ current, done, value });
        $await(peekerator.advance());
      }

      expect(observed).toEqual([
        {
          current: {
            done: false,
            value: 1,
          },
          done: false,
          value: 1,
        },
        {
          current: {
            done: false,
            value: 2,
          },
          done: false,
          value: 2,
        },
        {
          current: {
            done: false,
            value: 3,
          },
          done: false,
          value: 3,
        },
      ]);
    }),
  );

  describe('asIterator', () => {
    // eslint-disable-next-line jest/expect-expect
    it(
      'cleans up source iterable',
      $async(() => {
        $await($peekerate($wrap([1, 2, 3])))
          .asIterator()
          .return();
      }),
    );
  });

  describe('documentation examples', () => {
    it(
      'README example works',
      $async(() => {
        const printValues = $async((values: $Iterable<number>) => {
          const peekr = $await($peekerate(values));

          return peekr.done ? 'none' : $await($str($interposeSeq(', ', peekr.asIterator())));
        });

        expect($await(printValues($wrap([])))).toBe('none');
        expect($await(printValues($wrap([1, 2, 3])))).toBe('1, 2, 3');
      }),
    );

    it(
      'cookbook example works',
      $async(() => {
        const printListEN = $async((values: $Iterable<number>, oxfordComma = true) => {
          let peekr = $await($peekerate(values));
          let result = '';
          let last = peekr.current;

          if (peekr.done) return 'none';

          while (!peekr.done) {
            last = peekr.current;
            peekr = $await(peekr.advance());
            if (!peekr.done) {
              if (peekr.index > 1) result += ', ';
              result += last.value.toString();
            }
          }

          if (peekr.index > 2) {
            if (oxfordComma) {
              result += ', ';
            }
            result += 'and ';
          } else if (peekr.index > 1) {
            result += ' and ';
          }

          result += anyType(last.value).toString();
          return result;
        });

        expect($await(printListEN($wrap([])))).toBe('none');
        expect($await(printListEN($wrap([1])))).toBe('1');
        expect($await(printListEN($wrap([1, 2])))).toBe('1 and 2');
        expect($await(printListEN($wrap([1, 2, 3])))).toBe('1, 2, and 3');
      }),
    );
  });
});
