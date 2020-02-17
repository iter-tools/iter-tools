import { $, $isAsync, $async, $await } from '../../../../generate/async.macro';

import { $deepEqualFactory, $wrap } from '../../..';
import { wrap as syncWrap } from '../../..';

describe($`deepEqualFactory`, () => {
  describe('iterableNullish: false', () => {
    const $deepEqual = $deepEqualFactory({
      iterableNullish: false,
      compareEquality: (a, b) => a == b,
    });
    it(
      'null and undefined are handled by compare',
      $async(() => {
        expect($await($deepEqual(null, undefined))).toBe(true);
        expect($await($deepEqual(null, undefined, $wrap([])))).toBe(false);
      }),
    );
  });

  describe('compareValues: false', () => {
    const $deepEqual = $deepEqualFactory({ compareValues: false });

    it(
      'throws if values are not iterable',
      $async(() => {
        let error;
        try {
          $await($deepEqual(4, null));
        } catch (e) {
          error = e;
        }
        expect(error).toMatchSnapshot();
      }),
    );

    it(
      'still compares values on recursion',
      $async(() => {
        expect($await($deepEqual($wrap([1]), $wrap([1])))).toBe(true);
      }),
    );

    it(
      'can still compare strings',
      $async(() => {
        expect($await($deepEqual('abc', 'abc'))).toBe(true);
      }),
    );
  });

  it(
    'can have a custom value comparator',
    $async(() => {
      const $deepNotEqual = $deepEqualFactory({ compareEquality: () => false });
      expect($await($deepNotEqual(1, 1))).toBe(false);

      const $deepDoubleEqual = $deepEqualFactory({
        iterableNullish: false,
        compareEquality: (a, b) => a == b,
      });
      expect(
        $await(
          $deepDoubleEqual(
            $wrap([null, $wrap([null]), $wrap([$wrap([null])])]),
            $wrap([undefined, $wrap([undefined]), $wrap([$wrap([undefined])])]),
          ),
        ),
      ).toBe(true);
    }),
  );

  it(
    'cannot have both compare and compareFactory arguments',
    $async(() => {
      let error;
      try {
        $deepEqualFactory({ compareEquality: _ => _, compareEqualityFactory: _ => _ });
      } catch (e) {
        error = e;
      }
      expect(error).toMatchSnapshot();
    }),
  );

  if ($isAsync) {
    describe('syncEqualsAsync: false', () => {
      const $deepEqual = $deepEqualFactory({ syncEqualsAsync: false });

      it(
        'does not consider sync iterables to equal async iterables',
        $async(() => {
          expect($await($deepEqual($wrap([1]), syncWrap([1])))).toBe(false);
          expect($await($deepEqual(syncWrap([1]), syncWrap([1])))).toBe(true);
          expect($await($deepEqual($wrap([]), null))).toBe(true);
        }),
      );
    });
  }
});
