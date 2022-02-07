/**
 * @generated-from ./$take.test.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { take } from 'iter-tools-es';
import { wrap, unwrap } from '../../../test/helpers.js';

describe('take', () => {
  it('takes the first n values', () => {
    expect(unwrap(take(2, wrap([1, 2, 3])))).toEqual([1, 2]);
  });
  it('completes immediately if requesting 0 (or less) items', () => {
    expect(unwrap(take(0, wrap([1, 2, 3])))).toEqual([]);
  });
  it('completes immediately after taking the first n values', () => {
    expect(
      unwrap(
        take(
          2,
          (function* twoItemsThenNever() {
            yield 1;
            yield 2;
            while (true) {
              // Never ends
            }
            yield 3;
          })(),
        ),
      ),
    ).toEqual([1, 2]);
  });
});
