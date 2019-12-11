import { $, $isAsync, $async, $await } from '../../../../generate/async.macro';

import { $groupBy } from '../../..';
import { $unwrapDeep as $uw } from '../../../__tests__/$helpers';

describe($`groupBy`, () => {
  it(
    'returns source values grouped by key function',
    $async(() => {
      const iter = $groupBy(item => item.toLowerCase(), 'AaaBbaACccCD');
      let next;
      next = $await(iter.next());
      expect(next.value[0]).toBe('a');
      next = $await(iter.next());
      expect(next.value[0]).toBe('b');
      next = $await(iter.next());
      expect(next.value[0]).toBe('a');
      next = $await(iter.next());
      expect(next.value[0]).toBe('c');
      next = $await(iter.next());
      expect(next.value[0]).toBe('d');
      next = $await(iter.next());
      expect(next.done).toBe(true);
    }),
  );

  it(
    'main cursor (curried)',
    $async(() => {
      const iter = $groupBy(_ => _)('AAABBAACCCCD');
      let next;
      next = $await(iter.next());
      expect(next.value[0]).toBe('A');
      next = $await(iter.next());
      expect(next.value[0]).toBe('B');
      next = $await(iter.next());
      expect(next.value[0]).toBe('A');
      next = $await(iter.next());
      expect(next.value[0]).toBe('C');
      next = $await(iter.next());
      expect(next.value[0]).toBe('D');
      next = $await(iter.next());
      expect(next.done).toBe(true);
    }),
  );

  it(
    'returns source values grouped by key function',
    $async(() => {
      const iter = $groupBy(item => item.toLowerCase(), 'AaaBbaACccCD');
      expect($await($uw(iter))).toEqual([
        ['a', ['A', 'a', 'a']],
        ['b', ['B', 'b']],
        ['a', ['a', 'A']],
        ['c', ['C', 'c', 'c', 'C']],
        ['d', ['D']],
      ]);
    }),
  );

  it(
    'returns source values grouped by identity',
    $async(() => {
      const iter = $groupBy(_ => _)('AAABBAACCCCD');
      expect($await($uw(iter))).toEqual([
        ['A', ['A', 'A', 'A']],
        ['B', ['B', 'B']],
        ['A', ['A', 'A']],
        ['C', ['C', 'C', 'C', 'C']],
        ['D', ['D']],
      ]);
    }),
  );

  it(
    'empty source returns empty iterable',
    $async(() => {
      expect($await($uw($groupBy(_ => _, null)))).toEqual([]);
      expect($await($uw($groupBy(_ => _)(null)))).toEqual([]);
      expect($await($uw($groupBy(_ => _, undefined)))).toEqual([]);
      expect($await($uw($groupBy(_ => _)(undefined)))).toEqual([]);
    }),
  );

  if ($isAsync) {
    it('uses key function returning a promise', async () => {
      const iter = $groupBy(async item => item.toLowerCase(), 'AaaBbaACccCD');
      let next;
      next = await iter.next();
      expect(next.value[0]).toBe('a');
      next = await iter.next();
      expect(next.value[0]).toBe('b');
      next = await iter.next();
      expect(next.value[0]).toBe('a');
      next = await iter.next();
      expect(next.value[0]).toBe('c');
      next = await iter.next();
      expect(next.value[0]).toBe('d');
      next = await iter.next();
      expect(next.done).toBe(true);
    });

    it(
      'with key function',
      $async(() => {
        const iter = $groupBy(async item => item.toLowerCase(), 'AaaBbaACccCD');
        expect($await($uw(iter))).toEqual([
          ['a', ['A', 'a', 'a']],
          ['b', ['B', 'b']],
          ['a', ['a', 'A']],
          ['c', ['C', 'c', 'c', 'C']],
          ['d', ['D']],
        ]);
      }),
    );
  }
});
