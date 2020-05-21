/**
 * @generated-from ./$first.test.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

/* eslint-disable no-unused-vars,import/no-duplicates,no-constant-condition */

import { asyncFirst } from '../../..';
import { asyncWrap } from '../../../__tests__/__framework__/async-wrap';
describe('asyncFirst', () => {
  describe('when iterable is empty', () => {
    it('returns undefined', async () => {
      expect(await asyncFirst(null)).toBe(undefined);
      expect(await asyncFirst(undefined)).toBe(undefined);
      expect(await asyncFirst(asyncWrap([]))).toBe(undefined);
    });
  });
  describe('when iterable contains values', () => {
    it('returns first value', async () => {
      expect(await asyncFirst(asyncWrap([1, 2, 3]))).toBe(1);
    });
  });
});
