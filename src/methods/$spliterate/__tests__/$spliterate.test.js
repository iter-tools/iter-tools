import { $, $async, $await } from '../../../../generate/async.macro';

import { $spliterate } from '../../..';
import { $wrap, $unwrapDeep } from '../../../test/$helpers';
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
        expect($await($unwrapDeep($testSpliterator([])))).toEqual([]);
      }),
    );
  });

  describe('when spliterator contains only a split', () => {
    it(
      'yields two empty groups',
      $async(() => {
        expect($await($unwrapDeep($testSpliterator([split])))).toEqual([[], []]);
      }),
    );
  });

  describe('when spliterator contains two splits', () => {
    it(
      'yields three empty groups',
      $async(() => {
        expect($await($unwrapDeep($testSpliterator([split, split])))).toEqual([[], [], []]);
      }),
    );
  });

  describe('when spliterator contains a trailing split', () => {
    it(
      'yields three empty groups',
      $async(() => {
        expect($await($unwrapDeep($testSpliterator([null, split])))).toEqual([[null], []]);
      }),
    );
  });

  describe('when spliterator contains a leading split', () => {
    it(
      'yields three empty groups',
      $async(() => {
        expect($await($unwrapDeep($testSpliterator([split, null])))).toEqual([[], [null]]);
      }),
    );
  });

  describe('abrupt termination', () => {
    const source = ['first', split, 'second'];

    // The assertions in these tests are part of the cleanup defined by $wrap
    /* eslint-disable jest/expect-expect */

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

    /* eslint-enable jest/expect-expect */
  });

  it(
    'options may be omitted',
    $async(() => {
      const $testSpliterator = $spliterate($identityStrategy);
      expect($await($unwrapDeep($testSpliterator([])))).toEqual([]);
    }),
  );
});
