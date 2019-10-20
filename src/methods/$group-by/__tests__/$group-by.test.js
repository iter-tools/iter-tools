import { $, $isAsync, $async, $await } from '../../../../generate/async.macro';

import { $groupBy, $toArray } from '../../..';

describe($`groupBy`, () => {
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
    'empty source returns empty iterable',
    $async(() => {
      expect($await($toArray($groupBy(_ => _, null)))).toEqual([]);
      expect($await($toArray($groupBy(_ => _)(null)))).toEqual([]);
      expect($await($toArray($groupBy(_ => _, undefined)))).toEqual([]);
      expect($await($toArray($groupBy(_ => _)(undefined)))).toEqual([]);
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
  }
});
