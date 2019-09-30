import { $, $async, $await } from '../../../../generate/async.macro';

import { $splitAt, $toArray, slice, range } from '../../..';

describe($`splitAt`, () => {
  it(
    'works when the halves are consumed in order',
    $async(() => {
      const [first, second] = $splitAt(3, slice(0, 6, range()));
      expect([$await($toArray(first)), $await($toArray(second))]).toEqual([[0, 1, 2], [3, 4, 5]]);
    }),
  );

  it(
    'works when the source is exhuasted while the first half is being consumed',
    $async(() => {
      const [first, second] = $splitAt(3, slice(0, 2, range()));
      expect([$await($toArray(first)), $await($toArray(second))]).toEqual([[0, 1], []]);
    }),
  );

  it(
    'works when the source is exhuasted while the second half is being consumed',
    $async(() => {
      const [first, second] = $splitAt(3, slice(0, 4, range()));
      expect([$await($toArray(first)), $await($toArray(second))]).toEqual([[0, 1, 2], [3]]);
    }),
  );

  it(
    'works when the second half is consumed before the first',
    $async(() => {
      const [first, second] = $splitAt(3, slice(0, 6, range()));
      expect([$await($toArray(second)), $await($toArray(first))]).toEqual([[3, 4, 5], [0, 1, 2]]);
    }),
  );

  it(
    'works when the sources are consumed alterantely',
    $async(() => {
      const [first, second] = $splitAt(3, range());
      const a = $await(first.next()).value;
      const d = $await(second.next()).value;
      const b = $await(first.next()).value;
      const e = $await(second.next()).value;
      const c = $await(first.next()).value;
      const f = $await(second.next()).value;
      $await(first.return());
      $await(second.return());
      expect([[a, b, c], [d, e, f]]).toEqual([[0, 1, 2], [3, 4, 5]]);
    }),
  );

  it(
    'works when the sources are consumed alterantely (reverse)',
    $async(() => {
      const [first, second] = $splitAt(3, range());
      const d = $await(second.next()).value;
      const a = $await(first.next()).value;
      const e = $await(second.next()).value;
      const b = $await(first.next()).value;
      const f = $await(second.next()).value;
      const c = $await(first.next()).value;
      $await(first.return());
      $await(second.return());
      expect([[a, b, c], [d, e, f]]).toEqual([[0, 1, 2], [3, 4, 5]]);
    }),
  );
});
