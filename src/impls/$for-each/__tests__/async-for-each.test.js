/**
 * @generated-from ./$for-each.test.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { asyncForEach } from '@iter-tools/es';
import { asyncWrap } from '../../../test/async-helpers.js';

describe('asyncForEach', () => {
  it('calls callback for each value in iterable', async () => {
    const arr: Array<number> = [];

    await asyncForEach(async (value) => arr.push(value), asyncWrap([1, 2, 3]));

    expect(arr).toEqual([1, 2, 3]);
  });
});
