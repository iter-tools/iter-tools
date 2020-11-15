import { $, $async, $await } from '../../../../generate/async.macro';

import { $spliterateGrouped } from '../../..';
import { $unwrapDeep } from '../../../test/$helpers';
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
        expect($await($unwrapDeep($testSpliterator([])))).toEqual([]);
      }),
    );
  });

  describe('when spliterator contains only a split', () => {
    it(
      'yields two empty groups',
      $async(() => {
        expect($await($unwrapDeep($testSpliterator([split, 'key'])))).toEqual([['key', []]]);
      }),
    );
  });

  describe('when spliterator contains two splits', () => {
    it(
      'yields three empty groups',
      $async(() => {
        expect($await($unwrapDeep($testSpliterator([split, 'key1', split, 'key2'])))).toEqual([
          ['key1', []],
          ['key2', []],
        ]);
      }),
    );
  });

  it(
    'options may be omitted',
    $async(() => {
      const $testSpliterator = $spliterateGrouped($identityStrategy);
      expect($await($unwrapDeep($testSpliterator([])))).toEqual([]);
    }),
  );
});
