import { $, $async, $await } from '../../../../generate/async.macro';

import { $splitOnAnySubseq, $toArray } from '../../..';
import { $wrap, $unwrapDeep } from '../../../test/$helpers';

describe($`splitOnAnySubseq`, () => {
  describe('when there are no sequences', () => {
    it(
      'yields a single part containing the values from source',
      $async(() => {
        expect($await($unwrapDeep($splitOnAnySubseq([], $wrap([1, 2, 3]))))).toEqual([[1, 2, 3]]);
      }),
    );
  });

  describe('when source is empty', () => {
    it(
      'yields no parts',
      $async(() => {
        expect($await($toArray($splitOnAnySubseq([null], null)))).toEqual([]);
        expect($await($toArray($splitOnAnySubseq([null], undefined)))).toEqual([]);
        expect($await($toArray($splitOnAnySubseq([null], $wrap([]))))).toEqual([]);
      }),
    );
  });

  describe('when no sequence is not present in source', () => {
    it(
      'yields a single part containing the values from source',
      $async(() => {
        expect(
          $await($unwrapDeep($splitOnAnySubseq([$wrap([undefined])], $wrap([1, 2, 3])))),
        ).toEqual([[1, 2, 3]]);
      }),
    );
  });

  describe('when a sequence is equal to source', () => {
    it(
      'yields two empty parts',
      $async(() => {
        expect($await($unwrapDeep($splitOnAnySubseq([$wrap([2, 2])], $wrap([2, 2]))))).toEqual([
          [],
          [],
        ]);
      }),
    );
  });

  describe('when sequences are present s times in source', () => {
    it(
      'yields s+1 parts',
      $async(() => {
        expect(
          $await($unwrapDeep($splitOnAnySubseq([$wrap([1, -1])], $wrap([1, 1, -1, 2, 1, -1, 3])))),
        ).toEqual([[1], [2], [3]]);
      }),
    );
  });

  describe('when sequences overlap with each other in source', () => {
    it(
      'should only split once',
      $async(() => {
        expect(
          $await(
            $unwrapDeep($splitOnAnySubseq([[2, 3], [3, 2]], $wrap([1, 2, 3, 2, 2, 3, 2, 3, 4]))),
          ),
        ).toEqual([[1], [2], [], [4]]);

        expect(
          $await($unwrapDeep($splitOnAnySubseq([[2, 3], [2, 2, 3]], $wrap([1, 2, 2, 3, 3, 4])))),
        ).toEqual([[1], [3, 4]]);
      }),
    );
  });

  describe('when more than one sequence matches', () => {
    it(
      'consume the longest sequence that matches',
      $async(() => {
        expect(
          $await($unwrapDeep($splitOnAnySubseq([[2, 2, 3], [2, 3]], $wrap([1, 2, 2, 3, 3, 4])))),
        ).toEqual([[1], [3, 4]]);

        expect(
          $await($unwrapDeep($splitOnAnySubseq([[2, 3], [2, 2, 3]], $wrap([1, 2, 2, 3, 3, 4])))),
        ).toEqual([[1], [3, 4]]);

        expect(
          $await($unwrapDeep($splitOnAnySubseq([[2, 2, 3], [2, 2]], $wrap([1, 2, 2, 3, 3, 4])))),
        ).toEqual([[1], [3, 4]]);

        expect(
          $await($unwrapDeep($splitOnAnySubseq([[2, 2], [2, 2, 3]], $wrap([1, 2, 2, 3, 3, 4])))),
        ).toEqual([[1], [3, 4]]);
      }),
    );
  });

  describe('when empty sequences are present', () => {
    it(
      'ignores them',
      $async(() => {
        expect($await($unwrapDeep($splitOnAnySubseq([null], $wrap([1, 2, 3]))))).toEqual([
          [1, 2, 3],
        ]);
        expect($await($unwrapDeep($splitOnAnySubseq([undefined], $wrap([1, 2, 3]))))).toEqual([
          [1, 2, 3],
        ]);
        expect($await($unwrapDeep($splitOnAnySubseq([$wrap([])], $wrap([1, 2, 3]))))).toEqual([
          [1, 2, 3],
        ]);
        expect(
          $await($unwrapDeep($splitOnAnySubseq([null, $wrap([2])], $wrap([1, 2, 3])))),
        ).toEqual([[1], [3]]);
      }),
    );
  });
});
