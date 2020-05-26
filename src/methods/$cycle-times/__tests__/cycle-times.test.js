/**
 * @generated-from ./$cycle-times.test.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

/* eslint-disable no-unused-vars,import/no-duplicates,no-constant-condition */

import { cycleTimes, toArray } from '../../..';
import { range } from '../../../__tests__/range';

describe('cycleTimes', () => {
  it('can cycle a limited number of times', () => {
    expect(toArray(cycleTimes(3, range(1, 4)))).toEqual([1, 2, 3, 1, 2, 3, 1, 2, 3]);
  });

  it('can be reused', () => {
    const myCycle = cycleTimes(2, range(1, 4));
    expect(toArray(myCycle)).toEqual([1, 2, 3, 1, 2, 3]);
    expect(toArray(myCycle)).toEqual([1, 2, 3, 1, 2, 3]);
  });
});
