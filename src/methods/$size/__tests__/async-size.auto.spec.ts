/**
 * @generated-from ./async-size.test.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

/* eslint-disable no-unused-vars,import/no-duplicates,no-constant-condition */

import { asyncSize } from '../../..';
import { asyncRange } from '../../../__tests__/async-range';

describe('asyncSize', () => {
  it('return number of items in iterable', async () => {
    expect(await asyncSize(asyncRange(1, 7))).toBe(6);
  });

  it('returns 0 for null or undefined', async () => {
    expect(await asyncSize(null)).toBe(0);
    expect(await asyncSize(undefined)).toBe(0);
  });
});
