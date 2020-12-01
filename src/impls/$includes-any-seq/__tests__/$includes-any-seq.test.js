import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $includesAnySeq } from 'iter-tools-es';
import { $wrap } from '../../../test/$helpers.js';

describe($`includesAnySeq`, () => {
  describe('when no sequences are given', () => {
    it(
      'returns false',
      $async(() => {
        expect($await($includesAnySeq([], $wrap([])))).toBe(false);
      }),
    );
  });

  describe('when iterable includes a given sequence', () => {
    it(
      'returns true',
      $async(() => {
        expect($await($includesAnySeq([$wrap([1, 2])], $wrap([1, 2, 3])))).toBe(true);
        expect($await($includesAnySeq([$wrap([2, 3]), $wrap([1, 2])], $wrap([1, 2, 3])))).toBe(
          true,
        );
        expect($await($includesAnySeq([$wrap([3])], $wrap([1, 2, 3])))).toBe(true);
      }),
    );
  });

  describe('when iterable is equal to a given sequence', () => {
    it(
      'returns true',
      $async(() => {
        expect($await($includesAnySeq([$wrap([1, 2, 3])], $wrap([1, 2, 3])))).toBe(true);
      }),
    );
  });

  describe('when iterable is shorter than a matching sequence', () => {
    it(
      'returns false',
      $async(() => {
        expect($await($includesAnySeq([$wrap([1, 2, 3])], $wrap([1, 2])))).toBe(false);
      }),
    );
  });

  describe('when iterable is empty', () => {
    describe('and any sequence is empty', () => {
      it(
        'returns true',
        $async(() => {
          expect($await($includesAnySeq([$wrap([]), $wrap([null])], $wrap([])))).toBe(true);
          expect($await($includesAnySeq([null], $wrap([])))).toBe(true);
        }),
      );
    });

    describe('and no sequence is empty', () => {
      it(
        'returns false',
        $async(() => {
          expect($await($includesAnySeq([$wrap([undefined])], $wrap([])))).toBe(false);
        }),
      );
    });
  });
});
