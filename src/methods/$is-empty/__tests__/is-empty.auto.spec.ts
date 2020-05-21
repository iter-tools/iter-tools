/**
 * @generated-from ./is-empty.test.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { isEmpty } from '../../..';
import { wrap } from '../../../__tests__/__framework__/wrap';
describe('isEmpty', () => {
  describe('when iterable is empty', () => {
    it('returns true', () => {
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
      expect(isEmpty(wrap([]))).toBe(true);
    });
  });
  describe('when iterable contains values', () => {
    it('returns false', () => {
      expect(isEmpty(wrap([1, 2, 3]))).toBe(false);
    });
  });
});
