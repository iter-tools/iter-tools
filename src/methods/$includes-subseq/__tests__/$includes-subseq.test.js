import { $, $async, $await } from '../../../../generate/async.macro';

import { $includesSubseq } from '../../..';
import { $wrap } from '../../../test/$helpers';

describe($`includesSubseq`, () => {
  describe('when iterable includes a given sequence', () => {
    it(
      'returns true',
      $async(() => {
        expect($await($includesSubseq($wrap([1, 2]), $wrap([1, 2, 3])))).toBe(true);
        expect($await($includesSubseq($wrap([3]), $wrap([1, 2, 3])))).toBe(true);
      }),
    );
  });

  describe('when iterable is equal to a given sequence', () => {
    it(
      'returns true',
      $async(() => {
        expect($await($includesSubseq($wrap([1, 2, 3]), $wrap([1, 2, 3])))).toBe(true);
      }),
    );
  });

  describe('when iterable is shorter than a matching sequence', () => {
    it(
      'returns false',
      $async(() => {
        expect($await($includesSubseq($wrap([1, 2, 3]), $wrap([1, 2])))).toBe(false);
      }),
    );
  });

  describe('when iterable is empty', () => {
    describe('and sequence is empty', () => {
      it(
        'returns true',
        $async(() => {
          expect($await($includesSubseq($wrap([]), $wrap([])))).toBe(true);
        }),
      );
    });

    describe('and sequence is not empty', () => {
      it(
        'returns false',
        $async(() => {
          expect($await($includesSubseq($wrap([undefined]), $wrap([])))).toBe(false);
        }),
      );
    });
  });
});
