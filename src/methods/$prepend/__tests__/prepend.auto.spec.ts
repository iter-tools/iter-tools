/**
 * @generated-from ./prepend.test.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

/* eslint-disable no-unused-vars,import/no-duplicates,no-constant-condition */

import { prepend, toArray, wrap } from '../../..';

describe('prepend', () => {
  it('prepends a value', () => {
    expect(toArray(prepend(1, wrap([2, 3])))).toEqual([1, 2, 3]);
  });
});
