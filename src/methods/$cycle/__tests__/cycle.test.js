/**
 * @generated-from ./$cycle.test.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

/* eslint-disable no-unused-vars,import/no-duplicates,no-constant-condition */

import { cycle, slice, toArray } from '../../..';
import { range } from '../../../__tests__/range';

describe('cycle', () => {
  it('cycles iterable infinitely', () => {
    expect(toArray(slice(0, 7, cycle(range(1, 4))))).toEqual([1, 2, 3, 1, 2, 3, 1]);
  });
});
