import { $, $isAsync, $async, $await } from '../../../../generate/async.macro';

import { $groupBy, groupBy, asyncGroupBy, $toArray } from '../../..';

describe($`groupBy`, () => {
  it(
    'main cursor',
    $async(() => {
      const iter = $groupBy(null, 'AAABBAACCCCD');
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
    'with key function',
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
      const iter = $groupBy(null)('AAABBAACCCCD');
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
    'secondary',
    $async(() => {
      const iter = $groupBy(null, 'AAABBAACCCCD');
      let next;
      next = $await(iter.next());
      expect(next.value[0]).toBe('A');
      expect($await($toArray(next.value[1]))).toEqual(['A', 'A', 'A']);
      next = $await(iter.next());
      expect(next.value[0]).toBe('B');
      expect($await($toArray(next.value[1]))).toEqual(['B', 'B']);
      next = $await(iter.next());
      expect(next.value[0]).toBe('A');
      expect($await($toArray(next.value[1]))).toEqual(['A', 'A']);
      next = $await(iter.next());
      expect(next.value[0]).toBe('C');
      expect($await($toArray(next.value[1]))).toEqual(['C', 'C', 'C', 'C']);
      next = $await(iter.next());
      expect(next.value[0]).toBe('D');
      expect($await($toArray(next.value[1]))).toEqual(['D']);
      next = $await(iter.next());
      expect(next.done).toBe(true);
    }),
  );

  it(
    'secondary (consume partially)',
    $async(() => {
      const iter = $groupBy(null, 'AAABBAACCCCD');
      let next;
      next = $await(iter.next());
      expect(next.value[0]).toBe('A');
      expect($await(next.value[1].next()).value).toBe('A');
      expect($await(next.value[1].next()).value).toBe('A');
      expect($await(next.value[1].next()).value).toBe('A');
      expect($await(next.value[1].next()).done).toBe(true);
      next = $await(iter.next());
      expect(next.value[0]).toBe('B');
      next = $await(iter.next());
      expect(next.value[0]).toBe('A');
    }),
  );

  it(
    'null returns empty iterable',
    $async(() => {
      expect($await($toArray($groupBy(null, null)))).toEqual([]);
      expect($await($toArray($groupBy(null)(null)))).toEqual([]);
    }),
  );

  it(
    'groupBy of undefined returns empty iterable',
    $async(() => {
      expect($await($toArray($groupBy(undefined, undefined)))).toEqual([]);
      expect($await($toArray($groupBy(undefined)(undefined)))).toEqual([]);
    }),
  );

  if ($isAsync) {
    it('uses key function returning a promise', async () => {
      const iter = asyncGroupBy(async item => item.toLowerCase(), 'AaaBbaACccCD');
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
  } else {
    it('groupBy using destructuring', () => {
      const [group1, group2, group3] = groupBy(null, 'AAABBCCCC');
      expect(group1[0]).toBe('A');
      expect(group2[0]).toBe('B');
      expect(group3[0]).toBe('C');
      expect(Array.from(group1[1])).toEqual(['A', 'A', 'A']);
      expect(Array.from(group2[1])).toEqual(['B', 'B']);
      expect(Array.from(group3[1])).toEqual(['C', 'C', 'C', 'C']);
    });
  }
});
