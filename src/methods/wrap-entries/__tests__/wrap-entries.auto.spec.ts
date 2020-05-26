/**
 * @generated-from ./wrap-entries.test.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { wrapEntries } from '../../..';

describe('wrapEntries', () => {
  it('works with Map', () => {
    const mapEntries: Array<[string, string]> = [['foo', 'foo'], ['bar', 'bar']];
    expect(Array.from(wrapEntries(new Map(mapEntries)))).toEqual(mapEntries);
  });

  it('works with null', () => {
    const i = wrapEntries(null);
    expect(Array.from(i)).toEqual([]);
  });
});
