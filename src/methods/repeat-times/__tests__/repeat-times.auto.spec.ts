/**
 * @generated-from ./repeat-times.test.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { repeatTimes } from '../../..';

describe('repeatTimes', () => {
  it('repeats a value n times', () => {
    expect(Array.from(repeatTimes(3, 'x'))).toEqual(['x', 'x', 'x']);
  });

  it('can be reused', () => {
    const myRepeat = repeatTimes(3, 'x');
    expect(Array.from(myRepeat)).toEqual(['x', 'x', 'x']);
    expect(Array.from(myRepeat)).toEqual(['x', 'x', 'x']);
  });
});
