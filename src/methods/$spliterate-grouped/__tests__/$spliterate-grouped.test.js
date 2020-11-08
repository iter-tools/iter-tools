import { $, $async, $await } from '../../../../generate/async.macro';

import { $spliterateGrouped } from '../../..';
import { $unwrapDeep as $uw } from '../../../__tests__/$helpers';
import { split } from '../$spliterate-grouped';

$async;
function* $identityStrategy(_split: any, _options: any, source: any) {
  yield* source;
}

describe($`spliterateGrouped`, () => {
  const $testSpliterator = $spliterateGrouped($identityStrategy, {});

  describe('when spliterator is empty', () => {
    it(
      'yields no groups',
      $async(() => {
        expect($await($uw($testSpliterator([])))).toEqual([]);
      }),
    );
  });

  describe('when spliterator contains only a split', () => {
    it(
      'yields two empty groups',
      $async(() => {
        expect($await($uw($testSpliterator([split, 'key'])))).toEqual([['key', []]]);
      }),
    );
  });

  describe('when spliterator contains two splits', () => {
    it(
      'yields three empty groups',
      $async(() => {
        expect($await($uw($testSpliterator([split, 'key1', split, 'key2'])))).toEqual([
          ['key1', []],
          ['key2', []],
        ]);
      }),
    );
  });
});
