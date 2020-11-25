/**
 * @generated-from ./for-each.test.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

/* eslint-disable no-unused-vars,import/no-duplicates,no-constant-condition */

import { forEach } from '../../..';
import { wrap } from '../../../test/helpers';

describe('forEach', () => {
  it('calls callback for each value in iterable', () => {
    const arr: Array<number> = [];

    forEach((item) => arr.push(item), wrap([1, 2, 3]));

    expect(arr).toEqual([1, 2, 3]);
  });
});
