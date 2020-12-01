import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $spliterateGrouped } from 'iter-tools-es';
import { $unwrapDeep } from '../../../test/$helpers.js';

$async;
function* $identityStrategy(_split: any, _options: any, source: any) {
  yield* source;
}

describe($`spliterateGrouped`, () => {
  let split: symbol;
  const $testSpliterator = $spliterateGrouped((split_: any, options: any, source: any) => {
    split = split_;
    return $identityStrategy(split_, options, source);
  }, {});

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
