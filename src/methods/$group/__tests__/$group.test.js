import { $, $async, $await } from '../../../../generate/async.macro';

import { $group, $toArray } from '../../..';
import { $unwrapDeep as $uw } from '../../../__tests__/$helpers';

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

  it(
    'errors if groups are consumed out of order',
    $async(() => {
      const iter = $group('AB');
      const group1 = $await(iter.next()).value;
      const group2 = $await(iter.next()).value;

      expect(group1[0]).toBe('A');
      expect($await($uw(group2))).toEqual(['B', ['B']]);

      let error;
      try {
        $uw(group1[1]);
      } catch (e) {
        error = e;
      }
      expect(error).toMatchSnapshot();
    }),
  );
});
