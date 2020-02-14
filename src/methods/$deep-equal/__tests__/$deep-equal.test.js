import { $, $isAsync, $async, $await } from '../../../../generate/async.macro';

import { $deepEqual, $wrap } from '../../..';
import { wrap as syncWrap } from '../../..';

describe($`deepEqual`, () => {
  describe('given no values', () => {
    it(
      'throws',
      $async(() => {
        let error;
        try {
          $await($deepEqual());
        } catch (e) {
          error = e;
        }
        expect(error).toMatchSnapshot();
      }),
    );
  });

  describe('given primitives', () => {
    it(
      'returns true if all values are equal by Object.is',
      $async(() => {
        expect($await($deepEqual(1, 1))).toBe(true);
        expect($await($deepEqual(NaN, NaN))).toBe(true);
        expect($await($deepEqual('abc', 'abc'))).toBe(true);
      }),
    );

    it(
      'returns false if not all values are equal by Object.is',
      $async(() => {
        expect($await($deepEqual(0, 0, -0))).toBe(false);
      }),
    );
  });

  describe('given iterables', () => {
    it(
      'returns true if contents are equal',
      $async(() => {
        expect($await($deepEqual($wrap([1]), $wrap([1])))).toBe(true);
      }),
    );
  });

  describe('given null', () => {
    it(
      'returns true if contents are equal',
      $async(() => {
        expect($await($deepEqual(null, undefined, $wrap([])))).toBe(true);

        expect(
          $await(
            $deepEqual(
              $wrap([null, $wrap([[]]), $wrap([$wrap([null])])]),
              $wrap([[], $wrap([undefined]), $wrap([$wrap([undefined])])]),
            ),
          ),
        ).toBe(true);
      }),
    );
  });

  describe('given objects', () => {
    it(
      'returns true if entries are deep equal',
      $async(() => {
        expect($await($deepEqual({ key: 'val' }, { key: 'val' }))).toBe(true);
      }),
    );
  });

  describe('given nested iterables', () => {
    it(
      'returns true if contents are deep equal',
      $async(() => {
        expect(
          $await(
            $deepEqual(
              $wrap([$wrap([1]), $wrap([$wrap([$wrap([2])])]), $wrap([$wrap([3])])]),
              $wrap([$wrap([1]), $wrap([$wrap([$wrap([2])])]), $wrap([$wrap([3])])]),
            ),
          ),
        ).toBe(true);
      }),
    );
  });

  it(
    'Deep compares inside objects by default',
    $async(() => {
      expect(
        $await(
          $deepEqual(
            $wrap([{ a: $wrap([1]) }, { b: $wrap([{ c: $wrap([3]) }]) }]),
            $wrap([{ a: $wrap([1]) }, { b: $wrap([{ c: $wrap([3]) }]) }]),
          ),
        ),
      ).toBe(true);
    }),
  );

  it(
    'returns false if the contents are not deep equal',
    $async(() => {
      expect(
        $await(
          $deepEqual(
            $wrap([$wrap([1]), $wrap([2]), $wrap([3])]),
            $wrap([$wrap([1]), $wrap([2]), $wrap([3])]),
            $wrap([$wrap([1]), $wrap([2]), null]),
          ),
        ),
      ).toBe(false);
    }),
  );

  if ($isAsync) {
    it(
      'considers sync iterables to equal async iterables',
      $async(() => {
        expect(
          $await(
            $deepEqual(
              $wrap([$wrap([1]), syncWrap([2]), syncWrap([3])]),
              $wrap([syncWrap([1]), $wrap([2]), syncWrap([3])]),
            ),
          ),
        ).toBe(true);
      }),
    );
  }
});
