/**
 * @generated-from ./async-group.test.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

/* eslint-disable no-unused-vars,import/no-duplicates,no-constant-condition */

import { asyncGroup, asyncToArray } from '../../..';
import { asyncUnwrapDeep as asyncUw } from '../../../__tests__/async-helpers';

describe('asyncGroup', () => {
  it('main cursor', async () => {
    const iter = asyncGroup('AAABBAACCCCD');
    let next = await iter.next();
    expect(next.value[0]).toBe('A');
    next = await iter.next();
    expect(next.value[0]).toBe('B');
    next = await iter.next();
    expect(next.value[0]).toBe('A');
    next = await iter.next();
    expect(next.value[0]).toBe('C');
    next = await iter.next();
    expect(next.value[0]).toBe('D');
    next = await iter.next();
    expect(next.done).toBe(true);
  });

  it('secondary', async () => {
    const iter = asyncGroup('AAABBAACCCCD');
    let next = await iter.next();
    expect(next.value[0]).toBe('A');
    expect(await asyncToArray(next.value[1])).toEqual(['A', 'A', 'A']);
    next = await iter.next();
    expect(next.value[0]).toBe('B');
    expect(await asyncToArray(next.value[1])).toEqual(['B', 'B']);
    next = await iter.next();
    expect(next.value[0]).toBe('A');
    expect(await asyncToArray(next.value[1])).toEqual(['A', 'A']);
    next = await iter.next();
    expect(next.value[0]).toBe('C');
    expect(await asyncToArray(next.value[1])).toEqual(['C', 'C', 'C', 'C']);
    next = await iter.next();
    expect(next.value[0]).toBe('D');
    expect(await asyncToArray(next.value[1])).toEqual(['D']);
    next = await iter.next();
    expect(next.done).toBe(true);
  });

  it('secondary (consume partially)', async () => {
    const iter = asyncGroup('AAABBAACCCCD');
    let next = await iter.next();
    expect(next.value[0]).toBe('A');
    expect((await next.value[1].next()).value).toBe('A');
    expect((await next.value[1].next()).value).toBe('A');
    expect((await next.value[1].next()).value).toBe('A');
    expect((await next.value[1].next()).done).toBe(true);
    next = await iter.next();
    expect(next.value[0]).toBe('B');
    next = await iter.next();
    expect(next.value[0]).toBe('A');
  });

  it('grouping an empty iterable returns empty iterable', async () => {
    expect(await asyncToArray(asyncGroup(null))).toEqual([]);
    expect(await asyncToArray(asyncGroup(undefined))).toEqual([]);
  });

  it('errors if groups are consumed out of order', async () => {
    const iter = asyncGroup('AB');
    const group1 = (await iter.next()).value;
    const group2 = (await iter.next()).value;

    expect(group1[0]).toBe('A');
    expect(await asyncUw(group2)).toEqual(['B', ['B']]);

    let error;
    try {
      asyncUw(group1[1]);
    } catch (e) {
      error = e;
    }
    expect(error).toMatchSnapshot();
  });
});
