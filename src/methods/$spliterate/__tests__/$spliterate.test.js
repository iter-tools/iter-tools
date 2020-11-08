import { $, $async, $await } from '../../../../generate/async.macro';

import { $spliterate } from '../../..';
import { $unwrapDeep as $uw } from '../../../__tests__/$helpers';
import { $wrap } from '../../../__tests__/__framework__/$wrap';
import { split } from '../$spliterate';

$async;
function* $identityStrategy(_split: any, _options: any, source: any) {
  yield* source;
}

describe($`spliterate`, () => {
  const $testSpliterator = $spliterate($identityStrategy, {});

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
        expect($await($uw($testSpliterator([split])))).toEqual([[], []]);
      }),
    );
  });

  describe('when spliterator contains two splits', () => {
    it(
      'yields three empty groups',
      $async(() => {
        expect($await($uw($testSpliterator([split, split])))).toEqual([[], [], []]);
      }),
    );
  });

  describe('when spliterator contains a trailing split', () => {
    it(
      'yields three empty groups',
      $async(() => {
        expect($await($uw($testSpliterator([null, split])))).toEqual([[null], []]);
      }),
    );
  });

  describe('when spliterator contains a leading split', () => {
    it(
      'yields three empty groups',
      $async(() => {
        expect($await($uw($testSpliterator([split, null])))).toEqual([[], [null]]);
      }),
    );
  });

  describe('abrupt termination', () => {
    // The assertions in these tests are part of the cleanup defined by $wrap
    const source = ['first', split, 'second'];

    it(
      "source is cleaned up if we're done before we started",
      $async(() => {
        const parts = $testSpliterator($wrap(source));
        $await(parts.return());
      }),
    );

    it(
      'source is cleaned up if part manager is closed then active part',
      $async(() => {
        const parts = $testSpliterator($wrap(source));
        const part = $await(parts.next()).value;
        $await(part.next());
        $await(parts.return());
        $await(part.return());
      }),
    );

    it(
      'source is cleaned up if active part is closed then part manager',
      $async(() => {
        const parts = $testSpliterator($wrap(source));
        const part = $await(parts.next()).value;
        $await(part.next());
        $await(part.return());
        $await(parts.return());
      }),
    );

    it(
      'source is cleaned up if active part is done then part manager is closed',
      $async(() => {
        const parts = $testSpliterator($wrap(source));
        const part = $await(parts.next()).value;
        $await(part.next());
        $await(part.next());
        $await(parts.return());
      }),
    );

    it(
      'source is cleaned up if part manager is closed then active part is done',
      $async(() => {
        const parts = $testSpliterator($wrap(source));
        const part = $await(parts.next()).value;
        $await(parts.return());
        $await(part.next());
        $await(part.next());
      }),
    );

    it(
      'source is cleaned up if only parts are consumed',
      $async(() => {
        const parts = $testSpliterator($wrap(source));
        $await(parts.next());
        $await(parts.next());
        $await(parts.next());
      }),
    );
  });
});
