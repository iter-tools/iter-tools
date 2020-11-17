import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $startsWithSeq } from '@iter-tools/es';
import { $wrap } from '../../../test/$helpers.js';

describe($`startsWithSeq`, () => {
  describe('when iterable starts with the sequence', () => {
    it(
      'returns true',
      $async(() => {
        expect($await($startsWithSeq($wrap([1, 2]), $wrap([1, 2, 3])))).toBe(true);
      }),
    );
  });

  describe('when iterable is equal to the sequence', () => {
    it(
      'returns true',
      $async(() => {
        expect($await($startsWithSeq($wrap([1, 2, 3]), $wrap([1, 2, 3])))).toBe(true);
      }),
    );
  });

  describe('when iterable is shorter than the sequence', () => {
    it(
      'returns false',
      $async(() => {
        expect($await($startsWithSeq($wrap([1, 2, 3]), $wrap([1, 2])))).toBe(false);
      }),
    );
  });

  describe('when iterable includes but does not start with the sequence', () => {
    it(
      'returns false',
      $async(() => {
        expect($await($startsWithSeq($wrap([2, 3]), $wrap([1, 2, 3])))).toBe(false);
      }),
    );
  });

  describe('when iterable is empty', () => {
    describe('and the sequence is empty', () => {
      it(
        'returns true',
        $async(() => {
          expect($await($startsWithSeq($wrap([]), $wrap([])))).toBe(true);
        }),
      );
    });

    describe('and the sequence is not empty', () => {
      it(
        'returns false',
        $async(() => {
          expect($await($startsWithSeq($wrap([undefined]), $wrap([])))).toBe(false);
        }),
      );
    });
  });
});
