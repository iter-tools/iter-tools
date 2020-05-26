/**
 * @generated-from ./$cycle-times.test.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

/* eslint-disable no-unused-vars,import/no-duplicates,no-constant-condition */

import { asyncCycleTimes, asyncToArray } from '../../..';
import { asyncRange } from '../../../__tests__/async-range';

describe('asyncCycleTimes', () => {
  it('can cycle a limited number of times', async () => {
    expect(await asyncToArray(asyncCycleTimes(3, asyncRange(1, 4)))).toEqual([
      1,
      2,
      3,
      1,
      2,
      3,
      1,
      2,
      3,
    ]);
  });

  it('can be reused', async () => {
    const myCycle = asyncCycleTimes(2, asyncRange(1, 4));
    expect(await asyncToArray(myCycle)).toEqual([1, 2, 3, 1, 2, 3]);
    expect(await asyncToArray(myCycle)).toEqual([1, 2, 3, 1, 2, 3]);
  });
});
