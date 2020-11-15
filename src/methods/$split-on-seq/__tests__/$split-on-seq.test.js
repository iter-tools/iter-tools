import { $, $async, $await } from '../../../../generate/async.macro';

import { $splitOnSeq, $toArray } from '../../..';
import { $wrap, $unwrapDeep } from '../../../test/$helpers';

describe($`splitOnSeq`, () => {
  describe('when source is empty', () => {
    it(
      'yields no parts',
      $async(() => {
        expect($await($toArray($splitOnSeq($wrap([]), null)))).toEqual([]);
        expect($await($toArray($splitOnSeq($wrap([]), undefined)))).toEqual([]);
        expect($await($toArray($splitOnSeq($wrap([]), $wrap([]))))).toEqual([]);
      }),
    );
  });

  describe('when sequence is empty', () => {
    it(
      'yields a single part with values from source',
      $async(() => {
        expect($await($unwrapDeep($splitOnSeq(null, $wrap([1, 2, 3]))))).toEqual([[1, 2, 3]]);
        expect($await($unwrapDeep($splitOnSeq(undefined, $wrap([1, 2, 3]))))).toEqual([[1, 2, 3]]);
        expect($await($unwrapDeep($splitOnSeq($wrap([]), $wrap([1, 2, 3]))))).toEqual([[1, 2, 3]]);
      }),
    );
  });

  describe('when sequence is not present in source', () => {
    it(
      'yields a single part containing the values from source',
      $async(() => {
        expect($await($unwrapDeep($splitOnSeq($wrap([undefined]), $wrap([1, 2, 3]))))).toEqual([
          [1, 2, 3],
        ]);
      }),
    );
  });

  describe('when sequence is equal to source', () => {
    it(
      'yields two empty parts',
      $async(() => {
        expect($await($unwrapDeep($splitOnSeq($wrap([0, 0]), $wrap([0, 0]))))).toEqual([[], []]);
      }),
    );
  });

  describe('when sequence overlaps with itself in source', () => {
    it(
      'only a single split is created',
      $async(() => {
        expect($await($unwrapDeep($splitOnSeq($wrap([0, 0]), $wrap([1, 0, 0, 0, 2]))))).toEqual([
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
        expect($await($unwrapDeep($splitOnSeq([1, -1], $wrap([1, 1, -1, 2, 1, -1, 3]))))).toEqual([
          [1],
          [2],
          [3],
        ]);
      }),
    );
  });
});
