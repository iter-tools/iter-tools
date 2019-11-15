import { $, $isSync, $async, $await } from '../../../../generate/async.macro';

import { $group, $toArray } from '../../..';
import { $unwrapDeep as $uw } from '../../../__tests__/$helpers';

describe($`group`, () => {
  it(
    'main cursor',
    $async(() => {
      const iter = $group('AAABBAACCCCD');
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
    'returns grouped keys',
    $async(() => {
      const iter = $group('AAABBAACCCCD');
      expect($await($uw(iter))).toEqual(['A', 'B', 'A', 'C', 'D']);
    }),
  );

  it(
    'returns grouped values',
    $async(() => {
      const iter = $group('AAABBAACCCCD');
      expect($await($uw(iter))).toEqual([
        ['A', 'A', 'A'],
        ['B', 'B'],
        ['A', 'A'],
        ['C', 'C', 'C', 'C'],
        ['D'],
      ]);
    }),
  );

  it(
    'returns grouped entries',
    $async(() => {
      const iter = $group('AAABBAACCCCD');
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
