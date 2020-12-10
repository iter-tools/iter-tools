import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $startsWithAnySeq } from 'iter-tools-es';
import { $wrap } from '../../../test/$helpers.js';

describe($`startsWithAnySeq`, () => {
  describe('when no sequences are given', () => {
    it(
      'returns false',
      $async(() => {
        expect($await($startsWithAnySeq([], $wrap([])))).toBe(false);
      }),
    );
  });

  describe('when iterable starts with a given sequence', () => {
    it(
      'returns true',
      $async(() => {
        expect($await($startsWithAnySeq([$wrap([1, 2])], $wrap([1, 2, 3])))).toBe(true);
        expect($await($startsWithAnySeq([$wrap([1, 2]), $wrap([1, 2, 3])], $wrap([1, 2, 3])))).toBe(
          true,
        );
        expect($await($startsWithAnySeq([$wrap([1, 2, 3]), $wrap([1, 2])], $wrap([1, 2, 3])))).toBe(
          true,
        );
      }),
    );
  });

  describe('when iterable is equal to a given sequence', () => {
    it(
      'returns true',
      $async(() => {
        expect($await($startsWithAnySeq([$wrap([1, 2, 3])], $wrap([1, 2, 3])))).toBe(true);
      }),
    );
  });

  describe('when iterable is shorter than a matching sequence', () => {
    it(
      'returns false',
      $async(() => {
        expect($await($startsWithAnySeq([$wrap([1, 2, 3])], $wrap([1, 2])))).toBe(false);
      }),
    );
  });

  describe('when iterable includes but does not start with a given sequence', () => {
    it(
      'returns false',
      $async(() => {
        expect($await($startsWithAnySeq([$wrap([2, 3])], $wrap([1, 2, 3])))).toBe(false);
      }),
    );
  });

  describe('when iterable is empty', () => {
    describe('and any sequence is empty', () => {
      it(
        'returns true',
        $async(() => {
          expect($await($startsWithAnySeq([$wrap([]), $wrap([null])], $wrap([])))).toBe(true);
          expect($await($startsWithAnySeq([null], $wrap([])))).toBe(true);
        }),
      );
    });

    describe('and no sequence is empty', () => {
      it(
        'returns false',
        $async(() => {
          expect($await($startsWithAnySeq([$wrap([undefined])], $wrap([])))).toBe(false);
        }),
      );
    });
  });

  describe('when same function is specified', () => {
    const same = (a: number, b: number) => Math.abs(a) === Math.abs(b);
    it(
      'uses same value to do comparison',
      $async(() => {
        expect($await($startsWithAnySeq(same, [$wrap([-1])], $wrap([1, 2, 3])))).toBe(true);
        expect($await($startsWithAnySeq(() => false, [$wrap([1])], $wrap([1, 2, 3])))).toBe(false);
      }),
    );
  });
});
