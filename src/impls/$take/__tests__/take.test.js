/**
 * @generated-from ./$take.test.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { take } from '@iter-tools/es';
import { wrap, unwrap } from '../../../test/helpers.js';

describe('take', () => {
  it('takes the first n values', () => {
    expect(unwrap(take(2, wrap([1, 2, 3])))).toEqual([1, 2]);
  });
});
