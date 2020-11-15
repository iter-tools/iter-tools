import { $, $async, $await } from '../../../../generate/async.macro';

import { $splitOnSubseq, $toArray } from '../../..';
import { $wrap, $unwrapDeep } from '../../../test/$helpers';

describe($`splitOnSubseq`, () => {
  describe('when source is empty', () => {
    it(
      'yields no parts',
      $async(() => {
        expect($await($toArray($splitOnSubseq($wrap([]), null)))).toEqual([]);
        expect($await($toArray($splitOnSubseq($wrap([]), undefined)))).toEqual([]);
        expect($await($toArray($splitOnSubseq($wrap([]), $wrap([]))))).toEqual([]);
      }),
    );
  });

  describe('when sequence is empty', () => {
    it(
      'yields a single part with values from source',
      $async(() => {
        expect($await($unwrapDeep($splitOnSubseq(null, $wrap([1, 2, 3]))))).toEqual([[1, 2, 3]]);
        expect($await($unwrapDeep($splitOnSubseq(undefined, $wrap([1, 2, 3]))))).toEqual([
          [1, 2, 3],
        ]);
        expect($await($unwrapDeep($splitOnSubseq($wrap([]), $wrap([1, 2, 3]))))).toEqual([
          [1, 2, 3],
        ]);
      }),
    );
  });

  describe('when sequence is not present in source', () => {
    it(
      'yields a single part containing the values from source',
      $async(() => {
        expect($await($unwrapDeep($splitOnSubseq($wrap([undefined]), $wrap([1, 2, 3]))))).toEqual([
          [1, 2, 3],
        ]);
      }),
    );
  });

  describe('when sequence is equal to source', () => {
    it(
      'yields two empty parts',
      $async(() => {
        expect($await($unwrapDeep($splitOnSubseq($wrap([0, 0]), $wrap([0, 0]))))).toEqual([[], []]);
      }),
    );
  });

  describe('when sequence overlaps with itself in source', () => {
    it(
      'only a single split is created',
      $async(() => {
        expect($await($unwrapDeep($splitOnSubseq($wrap([0, 0]), $wrap([1, 0, 0, 0, 2]))))).toEqual([
          [1],
          [0, 2],
        ]);
      }),
    );
  });

  describe('when sequence is present s times in source', () => {
    it(
      'yields s+1 parts',
      $async(() => {
        expect(
          $await($unwrapDeep($splitOnSubseq([1, -1], $wrap([1, 1, -1, 2, 1, -1, 3])))),
        ).toEqual([[1], [2], [3]]);
      }),
    );
  });
});
