import { $, $async, $await } from '../../../../generate/async.macro';

import { $startsWithAnySubseq } from '../../..';
import { $wrap } from '../../../test/$helpers';

describe($`startsWithAnySubseq`, () => {
  describe('when no sequences are given', () => {
    it(
      'returns false',
      $async(() => {
        expect($await($startsWithAnySubseq([], $wrap([])))).toBe(false);
      }),
    );
  });

  describe('when iterable starts with a given sequence', () => {
    it(
      'returns true',
      $async(() => {
        expect($await($startsWithAnySubseq([$wrap([1, 2])], $wrap([1, 2, 3])))).toBe(true);
        expect(
          $await($startsWithAnySubseq([$wrap([1, 2]), $wrap([1, 2, 3])], $wrap([1, 2, 3]))),
        ).toBe(true);
        expect(
          $await($startsWithAnySubseq([$wrap([1, 2, 3]), $wrap([1, 2])], $wrap([1, 2, 3]))),
        ).toBe(true);
      }),
    );
  });

  describe('when iterable is equal to a given sequence', () => {
    it(
      'returns true',
      $async(() => {
        expect($await($startsWithAnySubseq([$wrap([1, 2, 3])], $wrap([1, 2, 3])))).toBe(true);
      }),
    );
  });

  describe('when iterable is shorter than a matching sequence', () => {
    it(
      'returns false',
      $async(() => {
        expect($await($startsWithAnySubseq([$wrap([1, 2, 3])], $wrap([1, 2])))).toBe(false);
      }),
    );
  });

  describe('when iterable includes but does not start with a given sequence', () => {
    it(
      'returns false',
      $async(() => {
        expect($await($startsWithAnySubseq([$wrap([2, 3])], $wrap([1, 2, 3])))).toBe(false);
      }),
    );
  });

  describe('when iterable is empty', () => {
    describe('and any sequence is empty', () => {
      it(
        'returns true',
        $async(() => {
          expect($await($startsWithAnySubseq([$wrap([]), $wrap([null])], $wrap([])))).toBe(true);
          expect($await($startsWithAnySubseq([null], $wrap([])))).toBe(true);
        }),
      );
    });

    describe('and no sequence is empty', () => {
      it(
        'returns false',
        $async(() => {
          expect($await($startsWithAnySubseq([$wrap([undefined])], $wrap([])))).toBe(false);
        }),
      );
    });
  });
});
