/**
 * @generated-from ./$group-by.test.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

/* eslint-disable no-unused-vars,import/no-duplicates,no-constant-condition */

import { groupBy } from '../../..';
import { unwrapDeep as uw } from '../../../__tests__/helpers';

describe('groupBy', () => {
  it('returns source values grouped by key function', () => {
    const iter = groupBy(item => item.toLowerCase(), 'AaaBbaACccCD');
    let next = iter.next();
    expect(next.value[0]).toBe('a');
    next = iter.next();
    expect(next.value[0]).toBe('b');
    next = iter.next();
    expect(next.value[0]).toBe('a');
    next = iter.next();
    expect(next.value[0]).toBe('c');
    next = iter.next();
    expect(next.value[0]).toBe('d');
    next = iter.next();
    expect(next.done).toBe(true);
  });

  it('main cursor (curried)', () => {
    const iter = groupBy(_ => _)('AAABBAACCCCD');
    let next = iter.next();
    expect(next.value[0]).toBe('A');
    next = iter.next();
    expect(next.value[0]).toBe('B');
    next = iter.next();
    expect(next.value[0]).toBe('A');
    next = iter.next();
    expect(next.value[0]).toBe('C');
    next = iter.next();
    expect(next.value[0]).toBe('D');
    next = iter.next();
    expect(next.done).toBe(true);
  });

  it('returns source values grouped by key function', () => {
    const iter = groupBy(item => item.toLowerCase(), 'AaaBbaACccCD');
    expect(uw(iter)).toEqual([
      ['a', ['A', 'a', 'a']],
      ['b', ['B', 'b']],
      ['a', ['a', 'A']],
      ['c', ['C', 'c', 'c', 'C']],
      ['d', ['D']],
    ]);
  });

  it('returns source values grouped by identity', () => {
    const iter = groupBy(_ => _)('AAABBAACCCCD');
    expect(uw(iter)).toEqual([
      ['A', ['A', 'A', 'A']],
      ['B', ['B', 'B']],
      ['A', ['A', 'A']],
      ['C', ['C', 'C', 'C', 'C']],
      ['D', ['D']],
    ]);
  });

  it('empty source returns empty iterable', () => {
    expect(uw(groupBy(_ => _, null))).toEqual([]);
    expect(uw(groupBy(_ => _)(null))).toEqual([]);
    expect(uw(groupBy(_ => _, undefined))).toEqual([]);
    expect(uw(groupBy(_ => _)(undefined))).toEqual([]);
  });
});
