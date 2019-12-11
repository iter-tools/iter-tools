import { $, $async, $await } from '../../../generate/async.macro';

import { $PartsIterator, split } from '../$spliterator';
import { $wrap } from '../../__tests__/__framework__/$wrap';

describe($`spliterator`, () => {
  $async;
  function* $testSpliterator() {
    const sourceIterator = $wrap(['first', 'second']);
    let sourceDone = false;
    try {
      yield $await(sourceIterator.next()).value;
      yield split;
      yield $await(sourceIterator.next()).value;
      $await(sourceIterator.next());
      sourceDone = true;
    } finally {
      if (!sourceDone) {
        sourceIterator.return();
      }
    }
  }

  $async;
  function* $testSplit() {
    yield* new $PartsIterator($testSpliterator());
  }

  // The assertions in these tests are part of the cleanup defined by $wrap

  it(
    'source is cleaned up if no values are taken',
    $async(() => {
      const parts = $testSplit();
      $await(parts.next());
      $await(parts.return());
    }),
  );

  it(
    'source is cleaned up if part manager is closed then active part',
    $async(() => {
      const parts = $testSplit();
      const part = $await(parts.next()).value;
      $await(part.next());
      $await(parts.return());
      $await(part.return());
    }),
  );

  it(
    'source is cleaned up if active part is closed then part manager',
    $async(() => {
      const parts = $testSplit();
      const part = $await(parts.next()).value;
      $await(part.next());
      $await(part.return());
      $await(parts.return());
    }),
  );

  it(
    'source is cleaned up if active part is done then part manager is closed',
    $async(() => {
      const parts = $testSplit();
      const part = $await(parts.next()).value;
      $await(part.next());
      $await(part.next());
      $await(parts.return());
    }),
  );

  it(
    'source is cleaned up if part manager is closed then active part is done',
    $async(() => {
      const parts = $testSplit();
      const part = $await(parts.next()).value;
      $await(parts.return());
      $await(part.next());
      $await(part.next());
    }),
  );

  it(
    'source is cleaned up if only parts are consumed',
    $async(() => {
      const parts = $testSplit();
      $await(parts.next());
      $await(parts.next());
      $await(parts.next());
    }),
  );
});
