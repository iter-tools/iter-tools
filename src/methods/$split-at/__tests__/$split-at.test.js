import { $, $isSync, $async, $await } from '../../../../generate/async.macro';
import { $awaitError } from '../../../../generate/test.macro';

import { $splitAt } from '../../..';
import { $wrap, $unwrap, $unwrapDeep } from '../../../test/$helpers';

describe($`splitAt`, () => {
  if ($isSync) {
    describe('spread destructuring', () => {
      describe('with 0 index', () => {
        it('when all values are in second part', () => {
          const [[...first], [...second]] = $splitAt(0, $wrap([0, 1, 2, 3, 4, 5]));
          expect([first, second]).toEqual([[], [0, 1, 2, 3, 4, 5]]);
        });
      });

      describe('with positive index', () => {
        it('works when the halves are consumed in order', () => {
          const [[...first], [...second]] = $splitAt(3, $wrap([0, 1, 2, 3, 4, 5]));
          expect([first, second]).toEqual([[0, 1, 2], [3, 4, 5]]);
        });

        it('works when the source is exhuasted while the first half is being consumed', () => {
          const [[...first], [...second]] = $splitAt(3, $wrap([0, 1]));
          expect([first, second]).toEqual([[0, 1], []]);
        });

        it('works when the source is exhuasted while the second half is being consumed', () => {
          const [[...first], [...second]] = $splitAt(3, $wrap([0, 1, 2, 3]));
          expect([first, second]).toEqual([[0, 1, 2], [3]]);
        });
      });

      describe('with negative index', () => {
        it('works when the halves are consumed in order', () => {
          const [[...first], [...second]] = $splitAt(-3, $wrap([0, 1, 2, 3, 4, 5]));
          expect([first, second]).toEqual([[0, 1, 2], [3, 4, 5]]);
        });

        it('all values are in the first part when |index| is larger than source size', () => {
          const [[...first], [...second]] = $splitAt(-3, $wrap([0, 1]));
          expect([first, second]).toEqual([[0, 1], []]);
        });
      });
    });
  }

  describe('with positive index', () => {
    it(
      'works when the halves are consumed in order',
      $async(() => {
        const [first, second] = $splitAt(3, $wrap([0, 1, 2, 3, 4, 5]));
        expect($await($unwrapDeep([first, second]))).toEqual([[0, 1, 2], [3, 4, 5]]);
      }),
    );

    it(
      'works when the source is exhuasted while the first half is being consumed',
      $async(() => {
        const [first, second] = $splitAt(3, $wrap([0, 1]));
        expect($await($unwrapDeep([first, second]))).toEqual([[0, 1], []]);
      }),
    );

    it(
      'works when the source is exhuasted while the second half is being consumed',
      $async(() => {
        const [first, second] = $splitAt(3, $wrap([0, 1, 2, 3]));
        expect($await($unwrapDeep([first, second]))).toEqual([[0, 1, 2], [3]]);
      }),
    );
  });

  describe('with negative index', () => {
    it(
      'works when the halves are consumed in order',
      $async(() => {
        const [first, second] = $splitAt(-3, $wrap([0, 1, 2, 3, 4, 5]));
        expect($await($unwrapDeep([first, second]))).toEqual([[0, 1, 2], [3, 4, 5]]);
      }),
    );

    it(
      'all values are in the first part when |index| is larger than source size',
      $async(() => {
        const [first, second] = $splitAt(-3, $wrap([0, 1]));
        expect($await($unwrapDeep([first, second]))).toEqual([[0, 1], []]);
      }),
    );
  });

  it(
    'allows the first half to be skipped',
    $async(() => {
      const [, second] = $splitAt(3, $wrap([0, 1, 2, 3, 4, 5]));
      expect($await($unwrap(second))).toEqual([3, 4, 5]);
    }),
  );

  it(
    'throws if only the first half is taken',
    $async(() => {
      const splits = $splitAt(3, $wrap([0, 1, 2, 3, 4, 5]));
      splits.next();
      expect(() => splits.return()).toThrowErrorMatchingSnapshot();
    }),
  );

  it(
    'throws when the second half is consumed before the first',
    $async(() => {
      const [first, second] = $splitAt(3, $wrap([0, 1, 2, 3, 4, 5]));
      expect($await($unwrap(second))).toEqual([3, 4, 5]);

      expect($awaitError($unwrap(first))).toMatchSnapshot();
    }),
  );
});
