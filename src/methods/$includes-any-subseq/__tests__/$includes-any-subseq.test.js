import { $, $async, $await } from '../../../../generate/async.macro';

import { $includesAnySubseq } from '../../..';
import { $wrap } from '../../../test/$helpers';

describe($`includesAnySubseq`, () => {
  describe('when no sequences are given', () => {
    it(
      'returns false',
      $async(() => {
        expect($await($includesAnySubseq([], $wrap([])))).toBe(false);
      }),
    );
  });

  describe('when iterable includes a given sequence', () => {
    it(
      'returns true',
      $async(() => {
        expect($await($includesAnySubseq([$wrap([1, 2])], $wrap([1, 2, 3])))).toBe(true);
        expect($await($includesAnySubseq([$wrap([2, 3]), $wrap([1, 2])], $wrap([1, 2, 3])))).toBe(
          true,
        );
        expect($await($includesAnySubseq([$wrap([3])], $wrap([1, 2, 3])))).toBe(true);
      }),
    );
  });

  describe('when iterable is equal to a given sequence', () => {
    it(
      'returns true',
      $async(() => {
        expect($await($includesAnySubseq([$wrap([1, 2, 3])], $wrap([1, 2, 3])))).toBe(true);
      }),
    );
  });

  describe('when iterable is shorter than a matching sequence', () => {
    it(
      'returns false',
      $async(() => {
        expect($await($includesAnySubseq([$wrap([1, 2, 3])], $wrap([1, 2])))).toBe(false);
      }),
    );
  });

  describe('when iterable is empty', () => {
    describe('and any sequence is empty', () => {
      it(
        'returns true',
        $async(() => {
          expect($await($includesAnySubseq([$wrap([]), $wrap([null])], $wrap([])))).toBe(true);
          expect($await($includesAnySubseq([null], $wrap([])))).toBe(true);
        }),
      );
    });

    describe('and no sequence is empty', () => {
      it(
        'returns false',
        $async(() => {
          expect($await($includesAnySubseq([$wrap([undefined])], $wrap([])))).toBe(false);
        }),
      );
    });
  });
});
