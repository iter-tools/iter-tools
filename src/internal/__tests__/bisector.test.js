/**
 * @generated-from ./$bisector.test.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { wrap, unwrap } from '../../test/helpers.js';
import { Bisector } from '../bisector.js';

function* testStrategy(split, options, source) {
  let i = 0;
  for (const value of source) {
    switch (++i) {
      case 1:
        yield value;
        break;
      case 2:
        yield split;
        yield value;
        return;
    }
  }
}

const testBisector = (source) => {
  return new Bisector(source, testStrategy, {});
};

describe('Bisector', () => {
  it('can spread destructure two part arrays', () => {
    const [[...first], [...second]] = testBisector(wrap([1, 2, 3]));
    expect([first, second]).toEqual([[1], [2]]);
  });

  it('allows the first half to be skipped', () => {
    const [, second] = testBisector(wrap([1, 2, 3]));
    expect(unwrap(second)).toEqual([2]);
  });

  it('throws if only the first half is taken', () => {
    const splits = testBisector(wrap([1, 2, 3]));
    splits.next();
    expect(() => splits.return()).toThrowErrorMatchingSnapshot();
  });

  it('throws when the second half is consumed before the first', () => {
    const [first, second] = testBisector(wrap([1, 2, 3]));
    expect(unwrap(second)).toEqual([2]);

    expect(
      (() => {
        try {
          unwrap(first);
        } catch (e) {
          return e;
        }
      })(),
    ).toMatchSnapshot();
  });
});
