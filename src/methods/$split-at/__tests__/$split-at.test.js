import { $, $isSync, $async, $await } from '../../../../generate/async.macro';

import { $splitAt, $toArray } from '../../..';
import { $range } from '../../../__tests__/$range';

describe($`splitAt`, () => {
  if ($isSync) {
    describe('with 0 index', () => {
      it('when all values are in second part', () => {
        const [[...first], [...second]] = $splitAt(0, $range(0, 6));
        expect([first, second]).toEqual([[], [0, 1, 2, 3, 4, 5]]);
      });
    });

    describe('with positive index', () => {
      it('works when the halves are consumed in order', () => {
        const [[...first], [...second]] = $splitAt(3, $range(0, 6));
        expect([first, second]).toEqual([[0, 1, 2], [3, 4, 5]]);
      });

      it('works when the source is exhuasted while the first half is being consumed', () => {
        const [[...first], [...second]] = $splitAt(3, $range(0, 2));
        expect([first, second]).toEqual([[0, 1], []]);
      });

      it('works when the source is exhuasted while the second half is being consumed', () => {
        const [[...first], [...second]] = $splitAt(3, $range(0, 4));
        expect([first, second]).toEqual([[0, 1, 2], [3]]);
      });
    });

    describe('with negative index', () => {
      it('works when the halves are consumed in order', () => {
        const [[...first], [...second]] = $splitAt(-3, $range(0, 6));
        expect([first, second]).toEqual([[0, 1, 2], [3, 4, 5]]);
      });

      it('all values are in the first part when |index| is larger than source size', () => {
        const [[...first], [...second]] = $splitAt(-3, $range(0, 2));
        expect([first, second]).toEqual([[0, 1], []]);
      });
    });

    describe('given strings', () => {
      describe('with 0 index', () => {
        it(
          'when all values are in second part',
          $async(() => {
            const [first, second] = $splitAt(0, 'abcdef');
            expect([$await(first), $await(second)]).toEqual(['', 'abcdef']);
          }),
        );
      });

      describe('with positive index', () => {
        it(
          'works when the string is longer than the split index',
          $async(() => {
            const [first, second] = $splitAt(3, 'abcdef');
            expect([$await(first), $await(second)]).toEqual(['abc', 'def']);
          }),
        );

        it(
          'works when the string is shorter than the split index',
          $async(() => {
            const [first, second] = $splitAt(3, 'ab');
            expect([$await(first), $await(second)]).toEqual(['ab', '']);
          }),
        );
      });

      describe('with negative index', () => {
        it(
          'works when the string is longer than the split index',
          $async(() => {
            const [first, second] = $splitAt(-3, 'abcdef');
            expect([$await(first), $await(second)]).toEqual(['abc', 'def']);
          }),
        );

        it(
          'works when the string is shorter than the split index',
          $async(() => {
            const [first, second] = $splitAt(-3, 'ab');
            expect([$await(first), $await(second)]).toEqual(['', 'ab']);
          }),
        );
      });
    });
  }

  describe('with positive index', () => {
    it(
      'works when the halves are consumed in order',
      $async(() => {
        const [first, second] = $splitAt(3, $range(0, 6));
        expect([$await($toArray(first)), $await($toArray(second))]).toEqual([[0, 1, 2], [3, 4, 5]]);
      }),
    );

    it(
      'works when the source is exhuasted while the first half is being consumed',
      $async(() => {
        const [first, second] = $splitAt(3, $range(0, 2));
        expect([$await($toArray(first)), $await($toArray(second))]).toEqual([[0, 1], []]);
      }),
    );

    it(
      'works when the source is exhuasted while the second half is being consumed',
      $async(() => {
        const [first, second] = $splitAt(3, $range(0, 4));
        expect([$await($toArray(first)), $await($toArray(second))]).toEqual([[0, 1, 2], [3]]);
      }),
    );
  });

  describe('with negative index', () => {
    it(
      'works when the halves are consumed in order',
      $async(() => {
        const [first, second] = $splitAt(-3, $range(0, 6));
        expect([$await($toArray(first)), $await($toArray(second))]).toEqual([[0, 1, 2], [3, 4, 5]]);
      }),
    );

    it(
      'all values are in the first part when |index| is larger than source size',
      $async(() => {
        const [first, second] = $splitAt(-3, $range(0, 2));
        expect([$await($toArray(first)), $await($toArray(second))]).toEqual([[0, 1], []]);
      }),
    );
  });

  it(
    'allows only the second half to being consumed',
    $async(() => {
      const [, second] = $splitAt(3, $range(0, 6));
      expect($await($toArray(second))).toEqual([3, 4, 5]);
    }),
  );

  it(
    'throws if only the first half is taken',
    $async(() => {
      let error;
      try {
        const [first] = $splitAt(3, $range(0, 6));
        $await($toArray(first));
      } catch (e) {
        error = e;
      }
      expect(error).toMatchSnapshot();
    }),
  );

  it(
    'throws when the second half is consumed before the first',
    $async(() => {
      const [first, second] = $splitAt(3, $range(0, 6));
      expect($await($toArray(second))).toEqual([3, 4, 5]);

      let error;
      try {
        $await($toArray(first));
      } catch (e) {
        error = e;
      }
      expect(error).toMatchSnapshot();
    }),
  );
});
