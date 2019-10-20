import { $, $isSync, $async, $await } from '../../../../generate/async.macro';

import { $group, $toArray } from '../../..';

describe($`group`, () => {
  it(
    'main cursor',
    $async(() => {
      const iter = $group('AAABBAACCCCD');
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
      const iter = $group('AAABBAACCCCD');
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
      const iter = $group('AAABBAACCCCD');
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
    'grouping an empty iterable returns empty iterable',
    $async(() => {
      expect($await($toArray($group(null)))).toEqual([]);
      expect($await($toArray($group(undefined)))).toEqual([]);
    }),
  );

  if ($isSync) {
    it('groups using destructuring', () => {
      const [group1, group2, group3] = $group('AAABBCCCC');
      expect(group1[0]).toBe('A');
      expect(group2[0]).toBe('B');
      expect(group3[0]).toBe('C');
      expect($toArray(group1[1])).toEqual(['A', 'A', 'A']);
      expect($toArray(group2[1])).toEqual(['B', 'B']);
      expect($toArray(group3[1])).toEqual(['C', 'C', 'C', 'C']);
    });
  }
});
